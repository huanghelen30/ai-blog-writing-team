import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopicBar from "../../components/TopicBar/TopicBar.jsx";
import QASection from "../../components/QASection/QASection.jsx";
import DraftSection from "../../components/DraftSection/DraftSection.jsx";
import WritingBar from "../../components/WritingBar/WritingBar.jsx";
import "./ResearchPage.scss"

const baseURL = import.meta.env.VITE_BACKEND_URL || 
  (import.meta.env.DEV ? 'http://localhost:8081' : 'https://ai-blog-writing-team-server.onrender.com');

function ResearchPage() {
  const { blogId: urlBlogId } = useParams();
  const navigate = useNavigate();
  
  // Use blogId from URL params, or fallback to localStorage
  const blogId = urlBlogId || localStorage.getItem("latestBlogId");

  const [messages, setMessages] = useState([
    { text: "Hey there! Type 'research' and I can do some digging for you, or just type in your own research.", sender: "Oliver" },
  ]);
  
  const [topic, setTopic] = useState(""); 
  const [blog, setBlog] = useState({ content: "" });
  const [researchData, setResearchData] = useState(null);
  const [researchSource, setResearchSource] = useState(null);
  const [_isGenerating, setIsGenerating] = useState(false);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ResearchPage useEffect - blogId:", blogId);
    if (blogId) {
      const fetchBlog = async () => {
        try {
          console.log("Fetching blog with ID:", blogId);
          const response = await axios.get(`${baseURL}/blog/${blogId}`);
          console.log("Blog response:", response.data);
          setTopic(response.data.selectedTopic || "No topic selected");
          setBlog({ content: response.data.content || "" });
          localStorage.setItem("latestBlogId", blogId);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
          setMessages(prevMessages => [...prevMessages, { text: "Error fetching blog data.", sender: "Oliver" }]);
        }
      };
      fetchBlog();
    } else {
      console.log("No blogId provided to ResearchPage");
      setLoading(false);
      setMessages(prevMessages => [...prevMessages, { text: "No blog ID provided. Please go back and save your topic first.", sender: "Oliver" }]);
    }
  }, [blogId]);

  const handleSubmit = async (text) => {
    if (!text.trim()) return;
    setMessages(prevMessages => [...prevMessages, { text, sender: "User" }]);

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
                { text: `Source: ${data.researchSource || "No sources found"}`, sender: "Oliver" }
            ]);

            setIsGenerating(false);
            setResearchData(data.mainTopicSummary);
            setResearchSource(data.researchSource)
        } catch (error) {
            console.error("Error generating research:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Couldn't generate research. Try again later.", sender: "Oliver" }]);
            setIsGenerating(false);
        }
    } else {
        setMessages(prevMessages => [...prevMessages, { text: `You've entered your own research: "${text}"`, sender: "Oliver" }]);
        setResearchData(text);
      }
};

const handleSave = async () => {
  try {
    if (!topic || !researchData) {
      console.error("Missing data to save research");
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Topic or research data is missing. Cannot save.", sender: "Oliver" }
      ]);
      return;
    }

    const response = await axios.post(`${baseURL}/research/save/${blogId}`, {
      content: researchData,
      source: researchSource || "Unknown"
    });

    setMessages(prevMessages => [
      ...prevMessages,
      { text: `Research saved: "${researchData}". Your research will be updated.`, sender: "Oliver" }
    ]);
  } catch (error) {
    console.error("Error saving research:", error);
    setMessages(prevMessages => [
      ...prevMessages,
      { text: "Failed to save research. Try again later.", sender: "Oliver" }
    ]);
  }
};

  const handleBack = () => {
    navigate(`/topic/${blogId}`);
  };

  const handleNext = () => {
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
        onSubmitMessage={handleSubmit}
        onBack={handleBack}
        onSave={handleSave}
        onNext={handleNext}
      />
    </main>
  );
}

export default ResearchPage;