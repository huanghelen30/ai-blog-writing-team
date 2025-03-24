import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopicBar from "/src/components/TopicBar/TopicBar.jsx";
import QASection from "/src/components/QASection/QASection.jsx";
import DraftSection from "/src/components/DraftSection/DraftSection.jsx";
import WritingBar from "/src/components/WritingBar/WritingBar.jsx";
import "./WritePage.scss"

const baseURL = import.meta.env.VITE_BACKEND_URL;

function WritePage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { text: "Hey there! Type 'write' and I can write a first draft for you, or you can start typing your draft on your own and ask me how you can improve your draft.", sender: "Sophia" },
  ]);
  
  const [topic, setTopic] = useState(""); 
  const [blog, setBlog] = useState({ content: "" });
  const [_isGenerating, setIsGenerating] = useState(false);
  const [_loading, setLoading] = useState(true);

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
          setMessages(prevMessages => [...prevMessages, { text: "Error fetching blog data.", sender: "Sophia" }]);
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [blogId]);

  const handleSubmit = async (text) => {
    if (!text.trim()) return;
    setMessages(prevMessages => [...prevMessages, { text, sender: "User" }]);

    if (text.toLowerCase() === "write") {
        setIsGenerating(true);
        setMessages(prevMessages => [...prevMessages, { text: "writing draft for you... please wait.", sender: "Sophia" }]);

        try {
            const response = await axios.post(`${baseURL}/write/${blogId}`, { action: "write" });
            const data = response.data;

            setMessages(prevMessages => [
                ...prevMessages,
                { text: `Ive written a draft based on the research for this blog, follow up with anything you'd like me to suggest for refinements`, sender: "Sophia" },
            ]);

            setBlog({ content: data.content });
            setIsGenerating(false); 
        } catch (error) {
            console.error("Error writing draft:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Couldn't write draft. Try again later.", sender: "Sophia" }]);
            setIsGenerating(false);
        }
    } else {
        try {
          const response = await axios.post(`${baseURL}/write/refine/${blogId}`, { 
            action: "refine",
            userInput: userInput,
            blogContent: blog.content 
          });
          const data = response.data;

          setMessages(prevMessages => [
              ...prevMessages,
              { text: `Here is what I suggest to refine in your draft based on what you've asked.` , sender: "Sophia" },
          ]);

          setBlog({ content: data.content });
          setIsGenerating(false);
      } catch (error) {
          console.error("Error writing draft:", error);
          setMessages(prevMessages => [...prevMessages, { text: "Couldn't write draft. Try again later.", sender: "Sophia" }]);
          setIsGenerating(false);
      }
    } 
};

const handleSave = async () => {
    if (!blog.content.trim) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Content is missing. Cannot save.", sender: "Sophia" }
      ]);
      return;
    }

    try {
      const response = await axios.put(`${baseURL}/blog/${blogId}`, {
        content: blog.content
      });

    setMessages(prevMessages => [
      ...prevMessages,
      { text: `Blog saved. Your blog will be updated.`, sender: "Sophia" }
    ]);
  } catch (error) {
    console.error("Error saving blog:", error);
    setMessages(prevMessages => [
      ...prevMessages,
      { text: "Failed to save blog. Try again later.", sender: "Sophia" }
    ]);
  }
};

  const handleBack = () => {
    navigate(`/research/${blogId}`);
  };

  const handleNext = () => {
    navigate(`/edit/${blogId}`);
  };

  return (
    <main className="writingpage">
      <TopicBar topic={topic} />
      <div className="container">
        <QASection messages={messages} />
        <DraftSection content={blog.content} setBlog={setBlog} />
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

export default WritePage;