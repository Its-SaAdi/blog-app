import React, { useEffect, useState } from 'react'
import dbService from '../appwrite/dbService'
import { useNavigate, useParams } from 'react-router'
import Container from '../components/Container/Container'
import PostForm from '../components/Post-Form/PostForm'

function EditPost() {
    const { slug } = useParams();
    const [post, setPost] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost