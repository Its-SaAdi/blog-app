import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import dbService from "../appwrite/dbService";
import storageService from "../appwrite/storageService";
import { Button } from "../components/index";
import PostCard from "../components/PostCard/PostCard";
import GoToTop from "../components/GoToTop/GoToTop";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { deletePost as deleteFromStore } from "../store/postSlice";
import { CalendarDaysIcon, Clock, User, Pencil, Trash2, Share2, ArrowLeft } from "lucide-react";

export default function Post() {
   const [post, setPost] = useState(null);
   const { slug } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userData = useSelector((state) => state.auth.userData);
   const dbPost = useSelector(state => state.post.posts);

   const isAuthor = post && userData ? post.userId === userData.$id : false;

   useEffect(() => {
      if (slug) {
         const post = dbPost.find((post) => post.$id === slug);
         if (post) {
            setPost(post);
         } 
         else {
            dbService.getPost(slug).then((post) => {
               if (post) setPost(post);
               else navigate('/');
            })
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
            dispatch(deleteFromStore({slug: post.$id}))
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
      <article className="w-full">
         <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="mb-6">
               <Button
                  onClick={() => navigate("/")}
                  bgColor="bg-green-700"
                  className="flex items-center gap-2 text-sm font-medium rounded-lg shadow-md hover:bg-green-800 transition"
                  >
                  <ArrowLeft size={16} />
                  Back to Blogs
               </Button>
            </div>

            <div className="relative">
               <img
                  src={storageService.getFileView(post.featuredImage)}
                  alt={post.title}
                  className="w-full shadow-lg rounded-2xl mb-10 object-cover max-h-[500px]"
                  loading="lazy"
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

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
               {post.title}
            </h1>

            {/* Author & Date */}
            <div className="flex flex-wrap gap-4 items-center justify-center text-sm text-gray-600 mb-8">
               <span className="flex items-center gap-2 font-medium">
                  <User size={16} />
                  {userData?.name || "Unknown Author"}
               </span>
                • 
               <span className="flex items-center gap-2">
                  <CalendarDaysIcon size={16} />
                  {new Date(post.$createdAt).toLocaleDateString("en-US", {
                     year: "numeric",
                     month: "short",
                     day: "numeric",
                  })}
               </span>
                • 
               <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {Math.ceil(post.content.split(" ").length / 200)} min read
               </span>
            </div>

            {/* Post Content */}
            <div className="prose lg:prose-lg prose-green max-w-none text-left">
               {parse(post.content)}
            </div>

            <div className="mt-12 flex justify-end">
               <Button
                  onClick={copyLink}
                  bgColor="bg-green-700"
                  className="flex gap-2 items-center text-sm font-medium rounded-lg shadow-md hover:bg-green-800"
               >
                  <Share2 size={16} />
                  Share this post
               </Button>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
               <div className="mt-10 border-t border-gray-200 pt-10">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Related Posts</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                     {relatedPosts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                     ))}
                  </div>
               </div>
            )}
         </div>
         <GoToTop />
      </article>
   ) : null;
}