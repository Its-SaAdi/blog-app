import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import dbService from "../appwrite/dbService";
import storageService from "../appwrite/storageService";
import { Button } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { CalendarDaysIcon, Clock, User, Pencil, Trash2, Share2 } from "lucide-react";

export default function Post() {
   const [post, setPost] = useState(null);
   const { slug } = useParams();
   const navigate = useNavigate();

   const userData = useSelector((state) => state.auth.userData);
   const dbPost = useSelector(state => state.post.posts);

   const isAuthor = post && userData ? post.userId === userData.$id : false;

   useEffect(() => {
      if (slug) {
         const post = dbPost.find((post) => post.$id === slug);
         if (post) {
            setPost(post);
         } 
      } else navigate("/");
   }, [slug, navigate]);

   // useEffect(() => {
   //    if (slug) {
   //       dbService.getPost(slug).then((post) => {
   //          if (post) setPost(post);
   //          else navigate("/");
   //       });
   //    } else navigate("/");
   // }, [slug, navigate]);

   const deletePost = () => {
      dbService.deletePost(post.$id).then((status) => {
         if (status) {
            storageService.deleteFile(post.featuredImage);
            navigate("/");
         }
      });
   };

   const copyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
   };

   const relatedPosts = dbPost
      .filter((p) => p.$id !== post?.$id)
      .slice(0, 3); // Just show top 3 for now

   return post ? (
      <div className="max-w-4xl mx-auto px-4 md:px-0 py-10">
         {/* Post Title */}
         <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            {post.title}
         </h1>

         {/* Post Meta Info */}
         <div className="flex items-center justify-around text-gray-600 font-semibold text-sm my-10">
            <span className="flex items-center gap-2">
               <User /> {userData?.name || "Unknown Author"}
            </span>
            <span className="flex items-center gap-2">
               <CalendarDaysIcon />
               {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
               })}
            </span>
            <span className="flex items-center gap-2">
               <Clock />
               {Math.ceil(post.content.split(" ").length / 200)} min read
            </span>
         </div>

         {/* Featured Image */}
         <div className="my-7 relative">
            <img
               src={storageService.getFileView(post.featuredImage)}
               alt={post.title}
               className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6 flex gap-2">
               <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-700" className="hover:bg-green-800 transition-colors">
                     <Pencil size={20} />
                  </Button>
               </Link>
               <Button bgColor="bg-green-700" onClick={deletePost} className="hover:bg-green-800 transition-colors">
                  <Trash2 size={20} />
               </Button>
              </div>
            )}
         </div>

         {/* Post Content */}
         <div className="text-left text-xl prose lg:prose-lg max-w-none text-gray-800 leading-relaxed">
            {parse(post.content)}
         </div>

         {/* Action Buttons */}
         <div className="mt-10 flex justify-end items-center">
            <Button onClick={copyLink} bgColor="bg-green-700" className="flex gap-2 items-center text-sm px-4 py-2 cursor-pointer hover:bg-green-800 transition-colors duration-200 font-semibold rounded-xl shadow-md">
               <Share2 size={16} /> Share blog
            </Button>
         </div>

         {/* Related Posts */}
         {relatedPosts.length > 0 && (
            <div className="mt-16">
               <h3 className="text-xl font-semibold mb-8 text-gray-900">Related Posts</h3>
               <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {relatedPosts.map((p) => (
                     <Link key={p.$id} to={`/post/${p.$id}`} className="w-full border border-black/10 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                        <img
                           src={storageService.getFileView(p.featuredImage)}
                           alt={p.title}
                           className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                           <h4 className="font-semibold text-gray-900">{p.title}</h4>
                           <p className="text-sm text-gray-600 mt-2 line-clamp-2">{parse(p.content.slice(0, 100))}</p>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         )}
      </div>
   ) : null;
}
