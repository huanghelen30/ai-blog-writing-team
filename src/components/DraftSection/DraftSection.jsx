import "./DraftSection.scss";

function DraftSection({ content, setBlog }) {

    return (
        <div className="draft-section">
            <textarea 
                className="draft__content" 
                value={content} 
                onChange={(e) => setBlog({ content: e.target.value })}></textarea>
        </div>
    );
}

export default DraftSection;
