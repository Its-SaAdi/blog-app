import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../appwrite/dbService'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard/PostCard'
import { setAllPosts } from '../store/postSlice';
import { Link } from 'react-router'

function Home() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const posts = useSelector((state) => state.post.posts);
    const userStatus = useSelector((state) => state.auth.status);

    // Here query is not executed because we are overwriting it with []. Both Active and unactive posts are fetched
    useEffect(() => {
      if (posts.length === 0) {
        setLoading(true);
        dbService.getPosts([]).then((posts) => {
            if (posts) {
                dispatch(setAllPosts(posts.documents));
            }
            setLoading(false);
        });
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

    return (
      <article className="w-full">
         {/* 🔝 Welcome Section */}
         <div className="py-16 bg-zinc-100">
            <Container>
               <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-10">
                  <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                     {userStatus ? (
                        <>Dive into <span className="text-green-700">Knowledge</span></>
                     ) : (
                        <>Welcome to <span className="text-green-700">Mind Nibbles</span></>
                     )}
                  </h1>
                  <p className="text-gray-600 text-base leading-7 mb-6 max-w-md mx-auto lg:mx-0">
                     {userStatus ? (
                        <>Explore thoughtfully crafted articles on tech, productivity, and personal growth. One post at a time, every day.</>
                     ) : (
                        <>Got a curious mind and a few minutes to spare? You're in the right place. Mind Nibbles serves up mini-articles, reflections, and fresh takes on topics that matter — all designed to fit into your busy day.</>
                     )}
                  </p>
                  {userStatus ? (
                     <a
                        href="#all-posts"
                        className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition"
                     >
                        Browse All Posts
                     </a>
                  ) : (
                     <Link
                        to="/login"
                        className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition"
                     >
                        Login to Explore Posts
                     </Link>
                  )}
                  </div>

                  <div className="flex justify-center">
                  <img
                     src={userStatus ? 'Reading-glasses.gif' : 'Blogging_1.gif'}
                     alt="Hero Image"
                     className="w-96 max-w-full"
                  />
                  </div>
               </div>
            </Container>
         </div>

         {/* 🔥 Top Picks (Always Visible if Posts Exist) */}
         {!userStatus && posts.length > 0 && (
            <div className="py-12">
               <Container>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-12">🧠 Top Picks from Mind Nibbles</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                     {posts.slice(0, 3).map((post) => (
                        <PostCard key={post.$id} {...post} />
                     ))}
                  </div>

                  <div className="text-center mt-12">
                     <p className="text-lg font-semibold text-gray-900 mb-4">
                        Want to see another blog posts or to publish your own?
                     </p>
                     <Link
                        to="/login"
                        className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition"
                     >
                        Login to get started
                     </Link>
                  </div>
               </Container>
            </div>
         )}

         {/* 📚 All Posts (Only Logged In) */}
         {userStatus && posts.length > 0 && (
            <div className="pb-16">
               <Container>
                  <h2 id="all-posts" className="text-3xl font-semibold text-gray-800 mb-12">All Posts</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                     {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                     ))}
                  </div>
               </Container>
            </div>
         )}
      </article>
   );

   //  if (posts.length === 0) {
   //      return (
   //          <article className="w-full py-16 bg-zinc-100">
   //             <Container>
   //                <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-10">
   //                   <div className="text-center lg:text-left">
   //                      <h1 className="text-4xl font-bold text-gray-900 mb-6">
   //                         Welcome to <span className="text-green-700">Mind Nibbles</span>
   //                      </h1>
   //                      <p className="text-gray-600 text-base leading-7 mb-7 max-w-md mx-auto lg:mx-0">
   //                         Got a curious mind and a few minutes to spare? You're in the right place. Mind Nibbles serves up mini-articles, reflections, and fresh takes on topics that matter — all designed to fit into your busy day.
   //                      </p>
   //                      <Link
   //                         to="/login"
   //                         className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition"
   //                      >
   //                         Login to Explore Posts
   //                      </Link>
   //                   </div>

   //                   <div className="flex justify-center">
   //                      <img
   //                         src="Blogging_1.gif"
   //                         alt="No Posts"
   //                         className="w-96 max-w-full"
   //                      />
   //                   </div>
   //                </div>
   //             </Container>
   //          </article>
   //      );
        
   //  }

   //  return (
   //      <article className="w-full">
   //       <div className="py-16 bg-zinc-100">
   //          <Container>
   //             <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-10">
   //                <div className="text-center lg:text-left">
   //                   <h1 className="text-4xl font-bold text-gray-900 mb-4">
   //                      Dive into <span className="text-green-700">Knowledge</span>
   //                   </h1>
   //                   <p className="text-gray-600 text-base leading-7 mb-6 max-w-md mx-auto lg:mx-0">
   //                      Explore thoughtfully crafted articles on tech, productivity, and personal growth. One post at a time, every day.
   //                   </p>
   //                   <a
   //                      href="#all-posts"
   //                      className="inline-block bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-800 transition"
   //                   >
   //                      Browse All Posts
   //                   </a>
   //                </div>
   //                <div className="flex justify-center">
   //                   <img
   //                      src="Reading-glasses.gif"
   //                      alt="Reading"
   //                      className="w-96 max-w-full"
   //                   />
   //                </div>
   //             </div>
   //          </Container>
   //       </div>

   //       {/* 🔥 Featured Posts */}
   //       <div className="py-12">
   //          <Container>
   //             <h2 className="text-3xl font-semibold text-gray-800 my-10">Featured Posts</h2>
   //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
   //                {posts.slice(0, 3).map((post) => (
   //                   <PostCard key={post.$id} {...post} />
   //                ))}
   //             </div>
   //          </Container>
   //       </div>

   //       {/* 📚 All Posts */}
   //       <div className="pb-16">
   //          <Container>
   //             <h2 id='all-posts' className="text-3xl font-semibold text-gray-800 mb-8">All Posts</h2>
   //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
   //                {posts.map((post) => (
   //                   <PostCard key={post.$id} {...post} />
   //                ))}
   //             </div>
   //          </Container>
   //       </div>
   //    </article>
   //  )
}

export default Home