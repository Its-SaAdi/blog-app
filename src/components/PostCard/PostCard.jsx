import React from 'react'
import { Link } from 'react-router'
import storageService from '../../appwrite/storageService'

function PostCard({ $id, title, featuredImage, $createdAt }) {
  const formattedDate = new Date($createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden transition-transform transform group-hover:scale-[1.02] group-hover:shadow-lg">
        {/* Image */}
        <div className="w-full h-auto overflow-hidden">
          <img
            src={storageService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full aspect-video transition-transform group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{title}</h2>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-2">
            <span className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-11 7h12M3 5h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
              </svg>
            </span>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard