import { Link } from "react-router-dom";

export default function Home({ blogs }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📄 All Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs yet. Try creating one!</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <div className="bg-white p-4 rounded-xl shadow hover:bg-gray-50">
                <h2 className="text-xl font-semibold text-blue-600">{blog.title}</h2>
                <p className="text-gray-500 text-sm">By {blog.author} on {blog.date}</p>
                <p className="text-gray-700 mt-2">{blog.content.slice(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
