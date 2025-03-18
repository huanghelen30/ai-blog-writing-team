import { Link } from "react-router-dom";
import dogHero from '/src/assets/dog-hero.PNG';
import nancyImage from "/src/assets/profiles/nancy-profile.png";
import oliverImage from "/src/assets/profiles/oliver-profile.png";
import sophiaImage from "/src/assets/profiles/sophia-profile.png";
import maxImage from "/src/assets/profiles/max-profile.png";
import CharacterCard from "/src/components/CharacterCard/CharacterCard.jsx";
import "./HomePage.scss"

function HomePage() {
  const cards = [
    { image: nancyImage,
      title: "Nancy", 
      intro: "Hey there, I'm Nancy! Fresh out of university and bursting with ideas, I'm here to help you find the perfect blog topic—whether you have a rough idea or no clue where to start.",
      path: "/topic" },
    { image: oliverImage,
      title: "Oliver", 
      intro: "Hey there, I'm Oliver! I'm always on top of the latest facts and trends, so I can help back up your ideas with the best info out there. Let's make sure your blog is solid and well-informed!",
      path: "/research" },
    { image: sophiaImage,
      title: "Sophia", 
      intro: "Hey there, I'm Sophia! I'm here to turn your ideas into words. Whether it's casual or professional, I'll help you craft a blog that's clear, engaging, and in your voice. ",
      path: "/write" },
    { image: maxImage,
      title: "Max", 
      intro: "Hey there, I'm Max! I'm the final polish before you hit publish. I'll clean up your text, fix up any grammar, and make sure everything reads perfectly. ",
      path: "/edit" },
  ]; 
    
  return (
    <>
      <div className="homepage">
        <img className="homepage__dog" src = {dogHero} alt ="Dog Hero Iamge" /> 
        <div className="intro">
          <p className="intro__heading">AI Agent-cy</p>
          <p className="intro__subheading">Your Friendly AI Writing Team</p>
          <Link to="/topics" className="intro__button">Start Writing</Link>
        </div>
      </div>
      <div className="cards">
            {cards.map((card, index) => (
                <CharacterCard 
                    key={card.title} 
                    title={card.title} 
                    intro={card.intro}
                    image={card.image}
                    path={card.path} 
                    isEven={index % 2 === 0}
                />
            ))}
      </div>
    </>
    
  )
}

export default HomePage