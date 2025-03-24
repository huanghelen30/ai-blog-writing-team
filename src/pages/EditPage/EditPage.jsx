import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopicBar from "/src/components/TopicBar/TopicBar.jsx";
import QASection from "/src/components/QASection/QASection.jsx";
import DraftSection from "/src/components/DraftSection/DraftSection.jsx";
import WritingBar from "/src/components/WritingBar/WritingBar.jsx";
import "./EditPage.scss"

const baseURL = import.meta.env.VITE_BACKEND_URL;

function EditPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { text: "Hey there! Type any changes or edits you want me to help with", sender: "Max" },
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
          setTopic(response.data?.selectedTopic || "No topic selected");
          setBlog({ content: response.data?.content || "" });
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
          setMessages(prevMessages => [...prevMessages, { text: "Error fetching blog data.", sender: "Max" }]);
        }
      };
      fetchBlog();
    }
  }, [blogId]);

  const handleSubmit = async (text) => {
    if (!text.trim()) return;
    setMessages(prevMessages => [...prevMessages, { text, sender: "User" }]);
    setIsGenerating(true);

    setMessages(prevMessages => [...prevMessages, { text: "racking my brain... please wait.", sender: "Max" }]);
    try {
        const response = await axios.post(`${baseURL}/edit/${blogId}`, { 
          action: "edit",
          draft: blog.content,
          instructions: text 
        });

        const data = response.data;

        setMessages(prevMessages => [
            ...prevMessages,
            { text: `${response.data.cleanResponse}`, sender: "Max" },
        ]);

        setIsGenerating(false);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        setMessages(prevMessages => [...prevMessages, { text: "Couldn't get suggestions. Try again later.", sender: "Max" }]);
        setIsGenerating(false);
    }
  };

const handleSave = async () => {
  try {
    if (!blog.content) {
      console.error("Missing data to save blog");
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Content is missing. Cannot save.", sender: "Max" }
      ]);
      return;
    }

    const response = await axios.put(`${baseURL}/blog/${blogId}`, {
      content: blog.content
    });

    console.log("Response from server:", response.data);
    setMessages(prevMessages => [
      ...prevMessages,
      { text: `Blog saved. Your blog will be updated.`, sender: "Max" }
    ]);
  } catch (error) {
    console.error("Error saving blog:", error);
    setMessages(prevMessages => [
      ...prevMessages,
      { text: "Failed to save blog. Try again later.", sender: "Max" }
    ]);
  }
};

  const handleBack = () => {
    navigate(`/research/${blogId}`);
  };

  const handleNext = () => {
    navigate(`/blogs`);
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
export default EditPage;