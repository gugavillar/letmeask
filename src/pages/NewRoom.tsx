import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/auth.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        if (newRoom.trim() === '') {
            return;
        }
        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });
        const notify = () => toast.success('Enter in room', {
            autoClose: 3000,
            onClose: () => history.push(`/admin/rooms/${firebaseRoom.key}`)
        });
        notify();
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/rooms/list">clique aqui</Link>
                    </p>
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}