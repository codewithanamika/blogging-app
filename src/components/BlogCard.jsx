import React from 'react';

const BlogCard = ({ title, description, url, author, image }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {image && (
        <img
          src={image}
          alt={title}
          className="mb-2 rounded object-cover h-48 w-full"
        />
      )}

      {/* Make title clickable */}
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h2 className="text-xl font-bold text-blue-600 hover:underline mb-2">
          {title}
        </h2>
      </a>

      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-sm text-gray-500">By {author}</p>
    </div>
  );
};

export default BlogCard;
