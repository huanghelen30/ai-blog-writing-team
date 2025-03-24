import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopicBar from "/src/components/TopicBar/TopicBar.jsx";
import QASection from "/src/components/QASection/QASection.jsx";
import DraftSection from "/src/components/DraftSection/DraftSection.jsx";
import WritingBar from "/src/components/WritingBar/WritingBar.jsx";
import "./TopicPage.scss";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function TopicPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Hey there! Type 'generate' and I can brainstorm some ideas for you to write about, or just type your own topic.", sender: "Nancy" },
  ]);
  const [topic, setTopic] = useState("No topic selected");
  const [blog, setBlog] = useState({ content: "" });
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [_generatedTopics, setGeneratedTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (value) => {
    setUserInput(value);
  };

  const handleSubmit = async (text) => {
    if (!text.trim()) return;
    setMessages(prevMessages => [...prevMessages, { text, sender: "User" }]);
    setUserInput("");
  
    if (text.toLowerCase() === 'generate') {
      setIsGenerating(true);
      setMessages(prevMessages => [...prevMessages, { text: "What topic do you want to write about?", sender: "Nancy" }]);
    } else if (isGenerating) {
      try {
        const response = await axios.post(`${baseURL}/topic`, { 
          action: "generate", 
          userInput: text 
        });
        const data = response.data;
        
        const topicsArray = data.topics.split("\n")
          .map((topic, index) => topic.trim())
          .filter((topic) => topic !== "")
          .slice(0, 5);
        
        if (topicsArray.length > 0) {
          setMessages(prevMessages => [
            ...prevMessages,
            { 
              text: `Here are some topic suggestions:\n${topicsArray.join("\n\n")}`,
              sender: "Nancy" 
            }
          ]);
          setGeneratedTopics(topicsArray);
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: "No topics available. Try again later.", sender: "Nancy" }
          ]);
        }
        setIsGenerating(false);
        setTopic("");
      } catch (error) {
        console.error("Error generating topics:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Couldn't generate topics. Try again later.", sender: "Nancy" }]);
        setIsGenerating(false);
      }
    } else {
      setTopic(text);
      setMessages(prevMessages => [...prevMessages, { text: `You have chosen your topic: "${text}"`, sender: "Nancy" }]);
      setGeneratedTopics([]);
    }
  };

  const handleSave = async () => {
    if (!topic || topic === "No topic selected") {
      setMessages(prevMessages => [...prevMessages, { text: "Please select a topic first.", sender: "Nancy" }]);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/blog`, { 
        selectedTopic: topic
      });
      const blogId = response.data.id;
      console.log("Response from server:", response.data);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Topic saved: "${topic}". A new blog will be created based on that topic.`, sender: "Nancy" }
      ]);
      navigate(`/topic/${blogId}`);
    } catch (error) {
      console.error("Error saving topic:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Failed to save blog. Try again later.", sender: "Nancy" }]);
    }
  };

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${baseURL}/blog/${blogId}`);
          setLoading(false);
          setTopic(response.data.selectedTopic);
          setBlog(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
          setMessages(prevMessages => [...prevMessages, { text: "Error fetching blog data.", sender: "Nancy" }]);
        }
      };
      fetchBlog();
    }
  }, [blogId]);

  const renderTopic = loading ? "Waiting for topic..." : topic;

  const handleBack = () => {
    console.log("Navigating back to HomePage");
    navigate(`/`);
  };
  
  const handleNext = () => {
    console.log("Navigating to next page with blogId:", blog.id);
    navigate(`/research/${blogId}`);
  };

  return (
    <main className="writingpage">
      <TopicBar topic={renderTopic} />
      <div className="container">
        <QASection messages={messages} />
        <DraftSection content={blog.content} />
      </div>
      <WritingBar 
        userInput={userInput} 
        setUserInput={handleInputChange} 
        onSubmitMessage={handleSubmit}
        onBack={handleBack}
        onSave={handleSave}
        onNext={handleNext}
      />
    </main>
  );
}

export default TopicPage;
