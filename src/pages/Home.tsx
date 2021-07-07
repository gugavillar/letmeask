import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';


import '../styles/auth.scss';


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle, logoutSystem } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    const notify = (text: string) => toast.success(text, {
        autoClose: 3000
    });
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleListRooms() {
        history.push('/rooms/list');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        const error = (text: string) => toast.error(text, {
            autoClose: 3000
        });
        const success = () => toast.success('Entering in room', {
            autoClose: 3000,
            onClose: () => history.push(`/rooms/${roomCode}`)
        });
        if (roomCode.trim() === '') {
            return;
        }

        if (!roomRef.exists()) {
            error('Room does not exists');
            return;
        }
        if (roomRef.val().endedAt) {
            error('Room is already closed')
            return;
        }
        success();
    }
    async function handleLogout() {
        notify('Logout system');
        await logoutSystem();

    }
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <Button onClick={handleListRooms}>Listar Salas</Button>
                    {user?.id && <Button onClick={handleLogout}>Sair do sistema</Button>}
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}