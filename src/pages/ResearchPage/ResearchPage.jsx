import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopicBar from "/src/components/TopicBar/TopicBar.jsx";
import QASection from "/src/components/QASection/QASection.jsx";
import DraftSection from "/src/components/DraftSection/DraftSection.jsx";
import WritingBar from "/src/components/WritingBar/WritingBar.jsx";
import "./ResearchPage.scss"

const baseURL = import.meta.env.VITE_BACKEND_URL;

function ResearchPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { text: "Hey there! Type 'research' and I can do some digging for you, or just type in your own research.", sender: "Oliver" },
  ]);
  
  const [topic, setTopic] = useState(""); 
  const [blog, setBlog] = useState({ content: "" });
  const [userInput, setUserInput] = useState("");
  const [_isGenerating, setIsGenerating] = useState(false);
  const [_loading, setLoading] = useState(true);
  const [awaitingRefinement, setAwaitingRefinement] = useState(false);
  const [researchData, setResearchData] = useState(null);

  const handleInputChange = (value) => {
    setUserInput(value);
  };

  const handleSubmit = async (text) => {
    if (!text.trim()) return;
    setMessages(prevMessages => [...prevMessages, { text, sender: "User" }]);
    setUserInput("");

    if (text.toLowerCase() === "research") {
        setIsGenerating(true);
        setMessages(prevMessages => [...prevMessages, { text: "Fetching research for you... please wait.", sender: "Oliver" }]);

        try {
            const response = await axios.post(`${baseURL}/research/${blogId}`, { action: "research" });
            const data = response.data;

            setMessages(prevMessages => [
                ...prevMessages,
                { text: `Here is the research for the topic:`, sender: "Oliver" },
                { text: `Main Topic: ${data.mainTopicSummary || "No summary available"}`, sender: "Oliver" },
                { text: `Source: ${data.researchSource || "No sources found"}`, sender: "Oliver" },
                { text: "Would you like me to refine or modify the research?", sender: "Oliver" }
            ]);

            setIsGenerating(false);
            setAwaitingRefinement(true);
        } catch (error) {
            console.error("Error generating research:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Couldn't generate research. Try again later.", sender: "Oliver" }]);
            setIsGenerating(false);
        }
    } else if (awaitingRefinement) {
        try {
            const response = await axios.post(`${baseURL}/research/${blogId}`, { action: "refine", userInput: text });
            setMessages(prevMessages => [...prevMessages, { text: response.data.mainTopicSummary, sender: "Oliver" }]);
        } catch (error) {
            console.error("Error refining research:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Couldn't refine the research. Try again later.", sender: "Oliver" }]);
        }

        setAwaitingRefinement(false);
    } else {
        setMessages(prevMessages => [...prevMessages, { text: `You've entered your own research: "${text}"`, sender: "Oliver" }]);
    }
};

  
  const handleSave = async () => {
    if (!topic) {
      setMessages(prevMessages => [...prevMessages, { text: "Please go back and generate a topic first.", sender: "Oliver" }]);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/research/${blogId}`, { 
        selectedTopic: topic
      });
      const blogId = response.data.id;
      console.log("Response from server:", response.data);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Research saved to the database. Your blog will be updated based on that research.`, sender: "Oliver" }
      ]);
      navigate(`/topic/${blogId}`);
    } catch (error) {
      console.error("Error saving research:", error);
      setMessages(prevMessages => [...prevMessages, { text: "Failed to save blog. Try again later.", sender: "Oliver" }]);
    }
  };

  useEffect(() => {
    if (blogId) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${baseURL}/blog/${blogId}`);
          setTopic(response.data.selectedTopic || "No topic selected");
          setBlog({ content: response.data.content || "" });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
          setMessages(prevMessages => [...prevMessages, { text: "Error fetching blog data.", sender: "Oliver" }]);
        }
      };
      fetchBlog();
    }
  }, [blogId]);

  const handleNext = () => {
    console.log("Navigating to next page with blogId:", blog.id);
    navigate(`/write/${blogId}`);
  };

  return (
    <main className="writingpage">
      <TopicBar topic={topic} />
      <div className="container">
        <QASection messages={messages} />
        <DraftSection content={blog.content} />
      </div>
      <WritingBar 
        userInput={userInput} 
        setUserInput={handleInputChange} 
        onSubmitMessage={handleSubmit}
        onSave={handleSave}
        onNext={handleNext}
      />
    </main>
  );
}

export default ResearchPage;