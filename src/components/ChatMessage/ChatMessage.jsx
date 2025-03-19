import Avatar from "/src/components/Avatar/Avatar.jsx";
import "./ChatMessage.scss";

function ChatMessage({ text, sender }) {
    return (
        <div className={`chat-message ${sender}`}>
            <Avatar sender={sender} />
            <div className="chat-container">
                <p className="message-name">{sender}</p>
                <div className="message-bubble">{text}</div>
            </div>
        </div>
    );
}

export default ChatMessage;
