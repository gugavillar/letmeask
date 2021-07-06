import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import classnames from 'classnames';

type RoomProps = {
    id: string,
    title: string,
    authorId: string,
    endedRoom?: boolean
}


export function RoomsList({
    id,
    title,
    authorId,
    endedRoom
}: RoomProps) {
    const history = useHistory();
    const { user } = useAuth();
    function goRoom(roomId: string) {
        history.push(`/rooms/${roomId}`);
    }
    function goAdminRoom(roomId: string) {
        history.push(`/admin/rooms/${roomId}`);
    }
    return (
        <div>
            <h3>{title}</h3>
            <footer>
                <div>
                    {endedRoom ?
                        <Button disabled>Sala encerrada</Button>
                        :
                        user?.id === authorId ?
                            <Button className={classnames('button', { 'admin-button': true })} onClick={() => goAdminRoom(id)}>Administrar sala</Button>
                            :
                            <Button onClick={() => goRoom(id)}>Entrar na sala</Button>

                    }
                </div>
            </footer>
        </div>
    )
}