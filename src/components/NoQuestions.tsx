import noQuestionsImg from '../assets/images/empty-questions.svg';
import '../styles/no-questions.scss';

type NoQuestionsProps = {
    text: string
}

export function NoQuestions({ text }: NoQuestionsProps) {
    return (
        <div className="noquestions-content">
            <div className="noquestions-img">
                <img src={noQuestionsImg} alt="Não existe perguntas" />
            </div>
            <div className="noquestions-text">
                <h2>Nenhuma pergunta por aqui...</h2>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}