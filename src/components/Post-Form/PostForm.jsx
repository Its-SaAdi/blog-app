import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../store/postSlice";
import { useNavigate } from "react-router";
import { Button, Input, Select } from "../index";
import RTE from "../RTE/RTE";
import { useForm } from "react-hook-form";
import dbService from "../../appwrite/dbService";
import storageService from "../../appwrite/storageService";

export default function PostForm({ post }) {
   const { register, handleSubmit, watch, setValue, getValues, control } =
      useForm({
         defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
         },
      });
   const navigate = useNavigate();
   const userData = useSelector((state) => state.auth.userData);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();

   const [previewImage, setPreviewImage] = useState(
      post ? storageService.getFilePreview(post.featuredImage) : null
   );

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) setPreviewImage(URL.createObjectURL(file));
   };

   const submit = async (data) => {
      setLoading(true);
      if (post) {
         const file = data.image[0]
            ? await storageService.uploadFile(data.image[0])
            : null;

         if (file) {
            storageService.deleteFile(post.featuredImage);
         }

         // can let user use the previous image if they don't upload the new one without deleting it
         const dbPost = await dbService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
         });

         // dispatch(updatePost({post: dbPost,  slug: dbPost.$id}));

         if (dbPost) navigate(`/post/${dbPost.$id}`);
      } else {
         const file = await storageService.uploadFile(data.image[0]);

         if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;

            const dbPost = await dbService.createPost({
               ...data,
               userId: userData.$id,
            });

            console.log(dbPost);
            dispatch(addPost(dbPost));

            if (dbPost) navigate(`/post/${dbPost.$id}`);
         }
      }
      setLoading(false);
   };

   const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
         return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

      return "";
   }, []);

   useEffect(() => {
      const subscription = watch((value, { name }) => {
         if (name === "title") {
            setValue("slug", slugTransform(value.title), {
               shouldValidate: true,
            });
         }
      });

      return () => subscription.unsubscribe();
   }, [watch, setValue, slugTransform]);

   return (
      <form
         onSubmit={handleSubmit(submit)}
         className="w-full mx-auto p-6 bg-zinc-100 border border-black/10 shadow-lg rounded-xl"
      >
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
               <Input
                  label="Title:"
                  placeholder="Enter blog title"
                  isRequired
                  className="mb-4"
                  {...register("title", { required: true })}
               />

               <Input
                  label="Slug:"
                  placeholder="Generated slug"
                  className="mb-4"
                  isRequired={false}
                  {...register("slug", { required: true })}
                  onInput={(e) => {
                     setValue("slug", slugTransform(e.currentTarget.value), {
                        shouldValidate: true,
                     });
                  }}
               />

               <RTE
                  label="Content: "
                  name="content"
                  control={control}
                  isRequired
                  defaultValue={getValues("content")}
               />
            </div>

            <div className="flex flex-col space-y-4">
               <Input
                  label="Featured Image: "
                  isRequired
                  type="file"
                  className="border border-gray-300 rounded-lg p-2 w-full file:cursor-pointer cursor-pointer file:bg-green-700 file:text-white hover:file:bg-green-800 file:py-1 file:px-2 file:rounded-md file:duration-200"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image", { required: !post })}
                  onChange={handleImageChange}
               />

               {previewImage && (
                  <img
                     src={previewImage}
                     alt={post?.title}
                     className="w-full h-40 object-cover rounded-lg shadow"
                  />
               )}

               <Select
                  options={["active", "inactive"]}
                  label="Status:"
                  className="my-3"
                  {...register("status", { required: true })}
               />

               <Button
                  type="submit"
                  disabled={loading}
                  bgColor={"bg-green-700"}
                  className={`w-full py-2 transition-colors duration-200 font-semibold rounded-xl shadow-md ${loading ? 'cursor-not-allowed opacity-70' : 'hover:bg-green-800 cursor-pointer'}`}
               >
                  {loading ? (
                     <div className="flex items-center justify-center space-x-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>{ post ? "Updating Post" : "Creating Post"}...</span>
                     </div>
                  ) : post ? "Update Post" : "Create Post"}
               </Button>
            </div>
         </div>
      </form>
   );
}
