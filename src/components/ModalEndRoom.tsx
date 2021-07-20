import disabledImg from '../assets/images/disabled.svg';
import { Modal } from './Modal';
import { Button } from './Button';

interface ModalEndRoomProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onCloseRoom: (roomId: string) => void;
    roomId: string;
}

export function ModalEndRoom({ isOpen, onRequestClose, onCloseRoom, roomId }: ModalEndRoomProps) {
    function handleCloseRoom() {
        onCloseRoom(roomId);
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="title-modal">
                <img src={disabledImg} alt="Encerrar sala" />
                <h2>Encerrar sala</h2>
                <p>Tem certeza que você deseja encerrar esta sala?</p>
            </div>
            <div className="buttons-modal">
                <Button onClick={onRequestClose}>Cancelar</Button>
                <Button onClick={handleCloseRoom}>Sim, encerrar</Button>
            </div>
        </Modal>
    );
}