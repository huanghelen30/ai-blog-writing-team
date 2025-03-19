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
  const [hasExistingTopic, setHasExistingTopic] = useState(null);
  const [confirmTopic, setConfirmTopic] = useState(false); 
  const [nextStep, setNextStep] = useState(null);

  async function handleTopicSelection(selectedTopic, userInput) {
    try {
      const response = await axios.post(`${baseURL}/topic`, {
        selectedTopic,
        userInput,
        hasExistingTopic,
        confirmTopic
      });

      const data = response.data;
      setMessages(prevMessages => [
        ...prevMessages,
        { text: data.message, sender: "Nancy" }
      ]);
      setTopic(data.selectedTopic || "No topic selected");
      setBlog(data.newBlog || {content: "" });
      setNextStep(data.nexStep);
    } catch (error) {
      console.error("Error fetching topic");
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Failed to load topic. Try again later.", sender: "Nancy" }
      ]);
    }
  }
    
  const handleInputChange = (value) => {
    setUserInput(value);
  }

  const handleGenerateTopics = () => {
    setHasExistingTopic(false);
    handleTopicSelection("", userInput, false, false);
  }

  const handleExistingTopic = (existingTopic) => {
    setHasExistingTopic(true); 
    handleTopicSelection(existingTopic, "", true, false);
  }

  const handleConfirmTopic = (selectedTopic) => {
    setConfirmTopic(true);
    handleTopicSelection(selectedTopic, "", true, true);
  }

  const handleSubmitMessage = async (text) => {
    if (!text.trim()) return;

    setMessages(prevMessages => [
      ...prevMessages,
      { text: text, sender: "User" }
    ]);
    
    setUserInput("");
    
    try {
      const response = await axios.post(`${baseURL}/topic`, {
        userInput: text, 
        hasExistingTopic: false 
      });

      const data = response.data;
      
      if (data.message) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.message, sender: "Nancy" }
        ]);
      }
      
      if (data.topics && data.topics.length > 0) {
        const topicsList = data.topics.join("\n- ");
        setMessages(prevMessages => [
          ...prevMessages,
          { text: `Here are some topic suggestions:\n- ${topicsList}`, sender: "Nancy" }
        ]);
      }
      
      if (data.selectedTopic) {
        setTopic(data.selectedTopic);
      }
      
      if (data.newBlog) {
        setBlog(data.newBlog);
      }
      
      if (data.nextStep) {
        setNextStep(data.nextStep);
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Sorry, I couldn't process your message. Please try again.", sender: "Nancy" }
      ]);
    }
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
        onConfirmTopic={handleConfirmTopic}
        onSubmitMessage={handleSubmitMessage}
      />
    </main>
  );
}

export default TopicPage;