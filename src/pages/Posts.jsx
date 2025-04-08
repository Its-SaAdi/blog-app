import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../appwrite/dbService'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard/PostCard'
import { setAllPosts } from '../store/postSlice';

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
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-xl font-semibold">Loading posts...</h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No posts available. Login to read posts.
                    </h1>
                </Container>
            </div>
        );
        
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        posts.map((post) => (
                            <div key={post.$id} className=''>
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home