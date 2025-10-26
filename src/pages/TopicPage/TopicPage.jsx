import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopicBar from "../../components/TopicBar/TopicBar.jsx";
import QASection from "../../components/QASection/QASection.jsx";
import DraftSection from "../../components/DraftSection/DraftSection.jsx";
import WritingBar from "../../components/WritingBar/WritingBar.jsx";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogId) {

      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${baseURL}/blog/${blogId}`);
          setLoading(false);
          setTopic(response.data.selectedTopic);
          setBlog(response.data);
          localStorage.setItem("latestBlogId", blogId);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
          setMessages(prevMessages => [...prevMessages, { text: "Error fetching blog data.", sender: "Nancy" }]);
        }
      };
      fetchBlog();
    }
  }, [blogId]);

  const handleSubmit = async (text) => {
    if (!text.trim()) return;

    setMessages(prevMessages => [...prevMessages, { text, sender: "User" }]);
  
    if (text.toLowerCase() === 'generate') {
      setIsGenerating(true);
      setMessages(prevMessages => [...prevMessages, { text: "What topic do you want to write about?", sender: "Nancy" }]);
      return;
    } 
    
    if (isGenerating) {
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
        
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            text: `Here are some topic suggestions:\n${topicsArray.join("\n\n")}`,
            sender: "Nancy" 
          }
        ]);
        setIsGenerating(false);
      } catch (error) {
        console.error("Error generating topics:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Couldn't generate topics. Try again later.", sender: "Nancy" }]);
        setIsGenerating(false);
      }
    } else {
      setTopic(text);
      setMessages(prevMessages => [...prevMessages, { text: `You have chosen your topic: "${text}"`, sender: "Nancy" }]);
    }
  };

  const handleSave = async () => {
    if (!topic || topic === "No topic selected") {
      setMessages(prevMessages => [...prevMessages, { text: "Please select a topic first.", sender: "Nancy" }]);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/blog`, { 
        selectedTopic: topic,
        content: blog.content
      });
    
      const newBlogId = response.data;

      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Topic saved: "${topic}". A new blog will be created based on that topic.`, sender: "Nancy" }
      ]);
      navigate(`/topic/${newBlogId}`);
    } catch (error) {
      console.error("Error saving topic:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Failed to save blog. Try again later.", sender: "Nancy" }]);
    }
  };

  const handleBack = () => {
    navigate(`/`);
  };
  
  const handleNext = () => {
    navigate(`/research/${blogId}`);
  };

  const renderTopic = loading ? "Waiting for topic..." : topic;

  return (
    <main className="writingpage">
      <TopicBar topic={renderTopic} />
      <div className="container">
        <QASection messages={messages} />
        <DraftSection content={blog.content} />
      </div>
      <WritingBar 
        onSubmitMessage={handleSubmit}
        onBack={handleBack}
        onSave={handleSave}
        onNext={handleNext}
      />
    </main>
  );
}

export default TopicPage;
