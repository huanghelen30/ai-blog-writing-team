import Avatar from "/src/components/Avatar/Avatar.jsx";
import "./ChatMessage.scss";

function ChatMessage({ text, sender }) {
    return (
        <div className={`chat-message ${sender === 'User' ? 'user-message' : ''}`}>
            <div className={`chat-container ${sender === 'user' ? 'user' : ''}`}>
                {sender !== 'user' && <Avatar sender={sender} />}
                <div className="message-bubble">{text}</div>
            </div>
        </div>
    );
}

export default ChatMessage;
