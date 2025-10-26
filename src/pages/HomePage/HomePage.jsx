import { Link } from "react-router-dom";
import dogHero from '../../assets/dog-hero.PNG';
import characterData from "../../data/characterData";
import CharacterCard from "../../components/CharacterCard/CharacterCard.jsx";
import "./HomePage.scss"

function HomePage() {  

  const latestBlogId = localStorage.getItem("latestBlogId");
  
  return (
    <>
      <div className="homepage">
        <img className="homepage__dog" src = {dogHero} alt ="Dog Hero Iamge" /> 
        <div className="intro">
          <p className="intro__heading">AI Agent-cy</p>
          <p className="intro__subheading">Your Friendly AI Writing Team</p>
          <Link to="/topic" className="intro__button">Start Writing</Link>
        </div>
      </div>
      <div className="cards">
            {characterData.map((card, index) => (
                <CharacterCard 
                    key={index} 
                    title={card.title} 
                    intro={card.intro}
                    image={card.image}
                    path={latestBlogId ? card.path.replace(":blogId", latestBlogId) : card.path} 
                    isEven={index % 2 === 0}
                />
            ))}
      </div>
    </>
    
  )
}

export default HomePage