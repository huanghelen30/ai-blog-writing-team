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
  const [researchData, setResearchData] = useState(null);
  const [researchSource, setResearchSource] = useState(null);

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

    console.log("Sending research data:", researchData);

    const response = await axios.post(`${baseURL}/research/${blogId}`, {
      content: researchData,
      source: researchSource || "Unknown"
    });

    console.log("Response from server:", response.data);
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

  const handleBack = () => {
    console.log("Navigating back to TopicPage with blogId;", blog.id);
    navigate(`/topic/${blogId}`);
  };

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
        onBack={handleBack}
        onSave={handleSave}
        onNext={handleNext}
      />
    </main>
  );
}

export default ResearchPage;