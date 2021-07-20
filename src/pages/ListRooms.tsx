import '../styles/list-rooms.scss';
import { NoQuestions } from '../components/NoQuestions';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Aside } from '../components/Aside';
import { useEffect, useState } from 'react';
import { database } from '../services/firebase';

type RoomType = {
    id: string,
    authorId: string,
    title: string,
    endedAt?: boolean
}

type FirebaseRooms = Record<string, {
    authorId: string,
    title: string,
    endedAt?: boolean
}>

export function ListRooms() {
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        const roomRef = database.ref(`rooms`);
        roomRef.once('value', room => {
            const firebaseRooms: FirebaseRooms = room.val() ?? {};
            const parsedRooms = Object.entries(firebaseRooms).map(([key, value]) => {
                return {
                    id: key,
                    authorId: value.authorId,
                    title: value.title,
                    endedAt: value.endedAt ? true : false
                }
            });
            setRooms(parsedRooms);
        });
    }, []);
    const history = useHistory();
    const { user } = useAuth();
    const notify = (link: string) => toast.success('Enter in room', {
        autoClose: 1500,
        onClose: () => history.push(link)
    });

    function goRoom(roomId: string) {
        const link = `/rooms/${roomId}`;
        notify(link);
    }
    function goAdminRoom(roomId: string) {
        const link = `/admin/rooms/${roomId}`;
        notify(link);
    }
    return (
        <div id="page-auth">
            <Aside />
            <main>
                <div className="list-rooms">
                    {rooms.length > 0 ? rooms.map(room =>
                        <div key={room.id}>
                            <h3>{room.title}</h3>
                            <footer>
                                <div>
                                    {room.endedAt ?
                                        <Button disabled>Sala encerrada</Button>
                                        :
                                        user?.id === room.authorId ?
                                            <Button className={classnames('button', { 'admin-button': true })} onClick={() => goAdminRoom(room.id)}>Administrar sala</Button>
                                            :
                                            <Button onClick={() => goRoom(room.id)}>Entrar na sala</Button>
                                    }
                                </div>
                            </footer>
                        </div>
                    )
                        :
                        <NoQuestions text="Crie um sala e envie o código da sala para seus amigos e comece a respoder perguntas!" title="Nenhuma sala por aqui..."></NoQuestions>
                    }
                </div>
            </main>
            <ToastContainer />
        </div>
    )
}