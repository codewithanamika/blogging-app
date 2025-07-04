import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Login from "./pages/Login";

function App() {
  const [blogs, setBlogs] = useState([]);

  const deleteBlog = (id) => {
  setBlogs((prev) => prev.filter((blog) => blog.id !== id));
};


  return (
    <div className="max-w-4xl mx-auto p-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/create" element={<CreateBlog setBlogs={setBlogs} />} />
       <Route path="/blog/:id" element={<BlogDetails blogs={blogs} deleteBlog={deleteBlog} />} />
       <Route path="/login" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
