import illustrationImg from '../assets/images/illustration.svg';
import '../styles/list-rooms.scss';
import { useList } from '../hooks/useList';
import { NoQuestions } from '../components/NoQuestions';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ListRooms() {
    const { rooms } = useList();
    const history = useHistory();
    const { user } = useAuth();
    const notify = (link: string) => toast.success('Enter in room', {
        autoClose: 3000,
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
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
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