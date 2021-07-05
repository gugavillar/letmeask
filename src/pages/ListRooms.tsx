import illustrationImg from '../assets/images/illustration.svg';
import '../styles/list-rooms.scss';
import { useList } from '../hooks/useList';
import { RoomsList } from '../components/RoomsList';

export function ListRooms() {
    const { rooms } = useList();
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className="list-rooms">
                    {rooms.map(room =>
                        !room.endedAt && <RoomsList key={room.id} id={room.id} title={room.title}></RoomsList>
                    )}
                </div>
            </main>
        </div>
    )
}