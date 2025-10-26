import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import "./BlogsPage.scss"

const baseURL = import.meta.env.VITE_BACKEND_URL;

function BlogsPage() {  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${baseURL}/blog`);
      console.log(response);
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="blogspage">
      <div className="blogsintro">
        <p className="blogsintro__heading">Your Work</p>
        <p className="blogsintro__subheading"> Check out your Blogs</p>
      </div>
      <div className="blogcards">
        {blogs.length > 0 ? (
          blogs.map((blog) =>
            blog.selectedTopic ? (
              <Link key={blog.id} to={`/edit/${blog.id}`} className="blog-link">
                <BlogCard 
                  blogId={blog.id}
                  title={blog.selectedTopic}
                  updated={blog.updated_at}
                />
              </Link>
            ) : null
          )
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div> 
  );
}

export default BlogsPage;
