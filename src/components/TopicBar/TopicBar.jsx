import "./TopicBar.scss";

function TopicBar({topic}) {
    return (
        <div className="topicbar">
            <p>Topic: {topic}</p>
        </div>
    );
}

export default TopicBar;
