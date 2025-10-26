import ChatMessage from "../ChatMessage/ChatMessage.jsx";
import "./QASection.scss";

function QASection({ messages }) {

    return (
        <div className="qa-section">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} text={msg.text} sender={msg.sender} />
                ))}
            </div>
        </div>
    );
}

export default QASection;
