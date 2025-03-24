import "./BlogCard.scss";

function BlogCard({ blogId, title, updated }) {
    const formatDate = (time) => {
        return new Date(time).toLocaleString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className= "blogcard">
            <p className="blogcard__title">{title}</p>
            <div className="blogcard-container">
                <p className="blogcard__id">Blog ID: {blogId}</p>
                <p className="blogcard__updated">Last updated: {formatDate(updated)}</p>
            </div>
        </div>
    );
}

export default BlogCard;
