import illustrationImg from '../assets/images/illustration.svg';
import '../styles/list-rooms.scss';
import { useList } from '../hooks/useList';
import { RoomsList } from '../components/RoomsList';
import { NoQuestions } from '../components/NoQuestions';

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
                    {rooms.length > 0 ? rooms.map(room =>
                        <RoomsList key={room.id} id={room.id} authorId={room.authorId} title={room.title} endedRoom={room.endedAt}></RoomsList>
                    )
                        :
                        <NoQuestions text="Crie um sala e envie o código desta sala para seus amigos e comece a respoder perguntas!" title="Nenhuma sala por aqui..."></NoQuestions>
                    }
                </div>
            </main>
        </div>
    )
}