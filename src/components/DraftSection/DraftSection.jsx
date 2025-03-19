import "./DraftSection.scss";

function DraftSection({ content }) {
    return (
        <div className="draft-section">
            <textarea className="draft__content" defaultValue={content}></textarea>
        </div>
    );
}

export default DraftSection;
