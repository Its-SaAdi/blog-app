import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, updatePost } from '../../store/postSlice';
import { useNavigate } from 'react-router';
import { Button, Input, Select } from '../index'
import RTE from '../RTE/RTE';
import { useForm } from 'react-hook-form';
import dbService from '../../appwrite/dbService';
import storageService from '../../appwrite/storageService';

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null;

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

                // dispatch(addPost(dbPost));

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') 
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {
                    shouldValidate: true,
                })
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
            <Input 
                label="Title: "
                placeholder="Enter title"
                className="mb-4"
                {...register("title", { required: true })}
            />

            <Input 
                label="Slug: "
                placeholder="slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                }}
            />

            <RTE 
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues('content')}
            />
        </div>

        <div className='w-1/3 px-2'>
            <Input 
                label="Featured Image: "
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />

            {post && (
                <div className="w-full mb-4">
                    <img 
                        src={storageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className='rounded-lg' 
                    />
                </div>
            )}

            <Select 
                options={['active', 'inactive']}
                label="Status: "
                className="mb-4"
                {...register('status', { required: true })}
            />

            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}