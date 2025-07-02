import { useParams, useNavigate } from "react-router-dom";

export default function BlogDetails({ blogs, deleteBlog }) {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));
  const navigate = useNavigate();

  if (!blog) return <p className="text-red-500">Blog not found.</p>;

   const handleDelete = () => {
    deleteBlog(blog.id);
    navigate("/"); // go back to home after deleting
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h1 className="text-3xl font-bold text-blue-700">{blog.title}</h1>
      <p className="text-sm text-gray-500">By {blog.author} on {blog.date}</p>
      <p className="text-gray-800 whitespace-pre-wrap">{blog.content}</p>

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        🗑️ Delete Blog
      </button>
    </div>
  );
}
