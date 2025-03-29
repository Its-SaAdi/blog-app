import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import dbService from "../appwrite/dbService";
import storageService from "../appwrite/storageService";
import { Container, Button } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
   const [post, setPost] = useState(null);
   const { slug } = useParams();
   const navigate = useNavigate();

   const userData = useSelector((state) => state.auth.userData);

   const isAuthor = post && userData ? post.userId === userData.$id : false;
   const formattedDate = post
      ? new Date(post.$createdAt).toLocaleDateString()
      : "";

   useEffect(() => {
      if (slug) {
         dbService.getPost(slug).then((post) => {
            if (post) setPost(post);
            else navigate("/");
         });
      } else navigate("/");
   }, [slug, navigate]);

   const deletePost = () => {
      dbService.deletePost(post.$id).then((status) => {
         if (status) {
            storageService.deleteFile(post.featuredImage);
            navigate("/");
         }
      });
   };

   return post ? (
      <div className="max-w-3xl mx-auto px-4 md:px-0 py-10">
         {/* Post Title */}
         <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
         </h1>

         {/* Featured Image */}
         <div className="my-7">
            <img
               src={storageService.getFilePreview(post.featuredImage)}
               alt={post.title}
               className="w-full h-auto rounded-lg shadow-lg"
            />
         </div>

         {/* Post Meta Info */}
         <div className="flex items-center justify-around text-gray-600 font-semibold text-sm my-8">
            {/* <FaUser className="mr-2" /> */}
            <span className="mr-4">👤 {"Unknown Author"}</span>
            {/* <FaCalendarAlt className="mr-2" /> */}

            <span className="mr-4">
               📅{" "}
               {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
               })}
            </span>
            <span>
               ⌚ {Math.ceil(post.content.split(" ").length / 200)} min read
            </span>
         </div>

         {/* Post Content */}
         <div className="text-left text-xl prose lg:prose-lg max-w-none text-gray-800 leading-relaxed">
            {parse(post.content)}
         </div>
      </div>
   ) : null;
}
