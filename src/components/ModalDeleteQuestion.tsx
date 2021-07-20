import { Modal } from './Modal';
import deleteModalImg from '../assets/images/delete_modal.svg';
import { Button } from './Button';

interface ModalDeleteQuestionProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onDeleteQuestion: (questionId: string) => void;
    questionId: string;
}

export function ModalDeleteQuestion({ isOpen, onRequestClose, onDeleteQuestion, questionId }: ModalDeleteQuestionProps) {
    function handleDeleteQuestion() {
        onDeleteQuestion(questionId);
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="title-modal">
                <img src={deleteModalImg} alt="Excluir pergunta" />
                <h2>Excluir pergunta</h2>
                <p>Tem certeza que você deseja excluir esta pergunta?</p>
            </div>
            <div className="buttons-modal">
                <Button onClick={onRequestClose}>Cancelar</Button>
                <Button onClick={handleDeleteQuestion}>Sim, excluir</Button>
            </div>
        </Modal>
    );
}