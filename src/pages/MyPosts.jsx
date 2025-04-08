import React, { useState, useEffect } from 'react'
// import dbService from '../appwrite/dbService'
import { useSelector } from 'react-redux';
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard/PostCard'

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const dbPosts = useSelector((state) => state.post.posts);
    
    useEffect(() => {
        if (dbPosts) {
            const userPosts = dbPosts.filter((post) => post.userId === userData.$id);
            console.log(dbPosts, userPosts);
            
            setPosts(userPosts);
        }
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