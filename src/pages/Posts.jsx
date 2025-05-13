import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../appwrite/dbService'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard/PostCard'
import { setAllPosts } from '../store/postSlice';
import { Link } from 'react-router'

function Home() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const posts = useSelector((state) => state.post.posts);

    // Here query is not executed because we are overwriting it with []. Both Active and unactive posts are fetched
    useEffect(() => {
      if (posts.length === 0) {
        setLoading(true);
        dbService.getPosts([]).then((posts) => {
            if (posts) {
                dispatch(setAllPosts(posts.documents));
            }
            setLoading(false);
        })
      }
    }, [dispatch, posts.length])

    if (loading) {
        return (
            <article className="w-full py-20 text-center bg-zinc-100">
                <Container>
                    <div className="flex flex-col items-center gap-9">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700" />
                        <h1 className="text-xl font-medium text-gray-600">Fetching wisdom...</h1>
                    </div>
                </Container>
            </article>
        );
    }

    if (posts.length === 0) {
        return (
            <article className="w-full py-16 bg-zinc-100">
               <Container>
                  <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-10">
                     <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                           Welcome to <span className="text-green-700">Mind Nibbles</span>
                        </h1>
                        <p className="text-gray-600 text-base leading-7 mb-6 max-w-md mx-auto lg:mx-0">
                           Bite-sized insights, delivered daily. Join now to explore knowledge, ideas, and inspiration.
                        </p>
                        <Link
                           to="/login"
                           className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition"
                        >
                           Login to Explore Posts
                        </Link>
                     </div>

                     <div className="flex justify-center">
                        <img
                           src="Blogging_1.gif"
                           alt="No Posts"
                           className="w-96 max-w-full"
                        />
                     </div>
                  </div>
               </Container>
            </article>
        );
        
    }

    return (
        <article className="w-full">
         <div className="py-16 bg-zinc-100">
            <Container>
               <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-10">
                  <div className="text-center lg:text-left">
                     <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Dive into <span className="text-green-700">Knowledge</span>
                     </h1>
                     <p className="text-gray-600 text-base leading-7 mb-6 max-w-md mx-auto lg:mx-0">
                        Explore thoughtfully crafted articles on tech, productivity, and personal growth. One post at a time, every day.
                     </p>
                     <a
                        href="#all-posts"
                        className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition"
                     >
                        Browse All Posts
                     </a>
                  </div>
                  <div className="flex justify-center">
                     <img
                        src="Reading-glasses.gif"
                        alt="Reading"
                        className="w-96 max-w-full"
                     />
                  </div>
               </div>
            </Container>
         </div>

         {/* 🔥 Featured Posts */}
         <div className="py-12">
            <Container>
               <h2 className="text-3xl font-semibold text-gray-800 mb-8">Featured Posts</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                  {posts.slice(0, 3).map((post) => (
                     <PostCard key={post.$id} {...post} />
                  ))}
               </div>
            </Container>
         </div>

         {/* 📚 All Posts */}
         <div className="pb-16">
            <Container>
               <h2 id='all-posts' className="text-3xl font-semibold text-gray-800 mb-8">All Posts</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {posts.map((post) => (
                     <PostCard key={post.$id} {...post} />
                     // <Link key={post.$id} href="" class="border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md hover:border-blue-500 transition-all">
                     //    <h3 class="text-base font-medium text-gray-800 dark:text-zinc-900">{post.title}</h3>
                     //    <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                     //       <span>Published: May 2025</span>
                     //       <span class="text-blue-500">&rarr;</span>
                     //    </div>
                     // </Link>
                     // <div key={post.$id} className='w-full p-4 bg-zinc-300 rounded-xl shadow-md flex items-center gap-5'>
                     //    <div>
                     //       <img 
                     //          src="src\images\EchoSphere2.png" 
                     //          alt="rounded-image"
                     //          className='w-12 rounded-full'
                     //       />
                     //    </div>

                     //    <div className='text-left'>
                     //       <h3 className='font-semibold text-'>{post.title}</h3>
                     //       <button className='cursor-pointer text-sm'>Read More</button>
                     //    </div>
                     // </div>
                  ))}
               </div>
            </Container>
         </div>
      </article>
    )
}

export default Home