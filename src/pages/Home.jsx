import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/dbService'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard/PostCard'
import { useDispatch } from 'react-redux'
import { setAllPosts } from '../store/postSlice';

function Home() {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
      dbService.getPosts().then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
      })
    }, [])

    useEffect(() => {
      if (posts.length > 0) {
        dispatch(setAllPosts(posts));
      }
    }, [posts])

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
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