import { Link } from "react-router-dom";
import "./CharacterCard.scss";

function CharacterCard({ title, intro, image, path, isEven }) {
    return (
        <Link to={path} className={`charactercard ${isEven ? "" : "charactercard--purple"}`}>
            <img className="charactercard__image" src={image} alt={`${title} avatar`} />
            <div className="charactercard__content">
                <p className="charactercard__title">{title}</p>
                <p className="charactercard__intro">{intro}</p>
            </div>
        </Link>
    );
}

export default CharacterCard;
