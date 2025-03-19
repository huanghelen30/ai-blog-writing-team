import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopicBar from "/src/components/TopicBar/TopicBar.jsx";
import QASection from "/src/components/QASection/QASection.jsx";
import DraftSection from "/src/components/DraftSection/DraftSection.jsx";
import WritingBar from "/src/components/WritingBar/WritingBar.jsx";
import "./TopicPage.scss"

const baseURL = import.meta.env.VITE_BACKEND_URL;

function TopicPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { text: "Hey there! Do you have a pre-existing topic or would you like me to come up with some?", sender: "Nancy" },
  ]);
  const [topic, setTopic] = useState("No topic selected");
  const [blog, setBlog] = useState({ content: "" });
  const [userInput, setUserInput] = useState("");
  const [nextStep, setNextStep] = useState(null);

  async function handleTopicSelection(selectedTopic, userInput) {
    try {
      const response = await axios.post(`${baseURL}/topic`, {
        selectedTopic,
        userInput,
        hasExistingTopic: selectedTopic !== "",
      });

      const data = response.data;
      setMessages([{ text: data.message, sender: "Nancy" }]);
      setTopic(data.selectedTopic || "No topic selected");
      setBlog(data.newBlog || {content: "" });
      setNextStep(data.nexStep);
    } catch (error) {
      console.error("Error fetching topic");
      setMessages([{ text: "Failed to load topic. Try again later.", sender: "Nancy" }]);
    }
  }
    
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleGenerateTopics = () => {
    handleTopicSelection("", userInput);
  }

  const handleExistingTopic = (existingTopic) => {
    handleTopicSelection(existingTopic, "");
  }

  return (
    <main className="topicpage">
      <TopicBar topic={topic}/>
      <div className="container">
        <QASection messages={messages} />
        <DraftSection content={blog.content}/>
      </div>
      <WritingBar 
        userInput={userInput} 
        setUserInput={handleInputChange} 
        onGenerateTopics={handleGenerateTopics}
        onExistingTopicSelect={handleExistingTopic}
      />
    </main>
  );
}

export default TopicPage;