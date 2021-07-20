import { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: ReactNode
}


export function Modal({ isOpen, onRequestClose, children }: ModalProps) {
    return (
        <ReactModal overlayClassName="react-overlay-modal" className="react-content-modal" isOpen={isOpen} onRequestClose={onRequestClose}>
            {children}
        </ReactModal>
    );
}