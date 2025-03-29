import React, { useState, useEffect } from 'react'
import dbService from '../appwrite/dbService'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard/PostCard'

function AllPosts() {
    const [posts, setPosts] = useState([]);

    // Here query is not executed because we are overwriting it with []. Both Active and unactive posts are fetched
    useEffect(() => {
        dbService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        });
    }, []);

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4'>
                {posts.map((post) => (
                    <div key={post.$id} className=''>
                        <PostCard 
                            {...post}
                        />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts