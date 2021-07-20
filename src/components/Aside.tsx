import illustrationImg from '../assets/images/illustration.svg';
export function Aside() {
    return (
        <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            <strong>Toda pergunta tem uma resposta</strong>
            <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
        </aside>
    );
}