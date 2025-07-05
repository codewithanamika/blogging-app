import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useAuth();

  // 🔄 Fetch blogs from Firestore
  const fetchBlogs = async () => {
    if (!currentUser) return;
    try {
      const postsRef = collection(doc(db, "users", currentUser.uid), "posts");
      const snapshot = await getDocs(postsRef);
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(posts);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentUser]);

  // 📝 Handle blog submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  const newBlog = {
    title,
    content,
    author: "Anamika",
    date: new Date().toLocaleDateString(),
    timestamp: serverTimestamp(),
  };

  try {
    const postRef = collection(doc(db, "users", currentUser.uid), "posts");
    const docRef = await addDoc(postRef, newBlog); // ✅ get Firestore doc ID

    const savedBlog = {
      ...newBlog,
      id: docRef.id, // ✅ store this for deletion
    };

    setBlogs((prev) => [savedBlog, ...prev]); // ✅ no need to re-fetch
    setTitle("");
    setContent("");
    alert("Blog published!");
  } catch (err) {
    console.error("Error saving blog:", err);
  }
};


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const blogDocRef = doc(db, "users", currentUser.uid, "posts", id);
      await deleteDoc(blogDocRef);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 rounded h-40"
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Publish
        </button>
      </form>

      {/* Show all blogs */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Your Blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="border p-4 mb-4 rounded">
            <h4 className="text-lg font-bold">{blog.title}</h4>
            <p className="text-gray-600 text-sm mb-1">{blog.date || "Today"}</p>
            <p>{blog.content}</p>
            <button
              onClick={() => handleDelete(blog.id)}
              className="text-red-500 text-sm mt-2 hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
