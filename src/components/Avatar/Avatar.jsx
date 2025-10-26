import characterData from "../../data/characterData";
import userAvatar from "../../assets/dog-avatar.jpg"; 
import "./Avatar.scss";

function Avatar({ sender }) {
    const character = characterData.find(char => char.title.toLowerCase() === sender.toLowerCase());

    return (
        <div className={`avatar ${sender}`}>
            <img
                className="profile"
                src={character ? character.image : userAvatar} 
                alt={`${sender} avatar`} 
            />
        </div>
    );
}

export default Avatar;
