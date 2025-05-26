import { Calendar, Clock } from "lucide-react";
import storageService from '../../appwrite/storageService'
// import parse from 'html-react-parser'
import { Link } from "react-router";

export default function PostCard({ $id, title, featuredImage, $createdAt, content }) {
  const formattedDate = new Date($createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
        <img
          src={storageService.getFileView(featuredImage)}
          alt={title}
          className="w-full h-40 object-cover sm:h-48 md:h-40 lg:h-40"
        />

        <div className="p-4 flex flex-col flex-1 text-left">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2">
            {title}
          </h2>

          {/* <p className="text-sm text-gray-600 line-clamp-3 flex-1 my-4">
            {"Start your day with these simple but powerful habits that improve your mental sharpness and mood...".slice(0, 30) + "..."}
          </p> */}

          <div className="flex justify-between text-xs text-gray-500 mt-4 border-t pt-4 border-gray-100">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{Math.ceil(content.split(" ").length / 200)} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}