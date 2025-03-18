import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "/src/Components/Header/Header.jsx";
import HomePage from "./pages/HomePage/HomePage";
import TopicPage from "./pages/TopicPage/TopicPage";
import ResearchPage from "./pages/ResearchPage/ResearchPage";
import WritePage from "./pages/WritePage/WritePage";
import EditPage from "./pages/EditPage/EditPage";
import BlogsPage from "./pages/BlogsPage/BlogsPage";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topic" element={<TopicPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App