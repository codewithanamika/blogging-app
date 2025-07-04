import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles');
        const data = await response.json();
        setBlogs(data.slice(0, 10));
        setLoading(false);
      } catch(error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recent Blogs</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard key={blog.id} title={blog.title} description={blog.description} url={blog.url} author={blog.author} image={blog.cover_image} />
        ))
      )}
    </div>
  );
};

export default Home;