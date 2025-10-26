import nancyImage from "../assets/profiles/nancy-profile.PNG";
import oliverImage from "../assets/profiles/oliver-profile.PNG";
import sophiaImage from "../assets/profiles/sophia-profile.PNG";
import maxImage from "../assets/profiles/max-profile.PNG";

const characterData = [
  {
    image: nancyImage,
    title: "Nancy",
    intro:
      "Hey there, I'm Nancy! Fresh out of university and bursting with ideas, I'm here to help you find the perfect blog topic—whether you have a rough idea or no clue where to start.",
    path: "/topic/:blogId",
  },
  {
    image: oliverImage,
    title: "Oliver",
    intro:
      "Hey there, I'm Oliver! I'm always on top of the latest facts and trends, so I can help back up your ideas with the best info out there. Let's make sure your blog is solid and well-informed!",
    path: "/research/:blogId",
  },
  {
    image: sophiaImage,
    title: "Sophia",
    intro:
      "Hey there, I'm Sophia! I'm here to turn your ideas into words. Whether it's casual or professional, I'll help you craft a blog that's clear, engaging, and in your voice.",
    path: "/write/:blogId",
  },
  {
    image: maxImage,
    title: "Max",
    intro:
      "Hey there, I'm Max! I'm the final polish before you hit publish. I'll clean up your text, fix up any grammar, and make sure everything reads perfectly.",
    path: "/edit/:blogId",
  },
];

export default characterData;
