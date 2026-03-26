import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsData } from '../../../data.js'; 
import Post from '../../molecules/Post/Post.jsx';
import Button from '../../atoms/Button/Button.jsx';

const PostDetails = () => {

  const { postId } = useParams();
  const navigate = useNavigate();


  const post = postsData.find((p) => p.id === parseInt(postId));

  if (!post) {
    return (
      <div className="section">
        <h2>Пост не знайдено</h2>
        <Button onClick={() => navigate('/feed')}>Повернутися до стрічки</Button>
      </div>
    );
  }

  return (
    <section className="section">
      <Button onClick={() => navigate(-1)} variant="secondary">
        ← Назад
      </Button>
      <div style={{ marginTop: '20px' }}>
        <Post {...post} />
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h3>Повний текст публікації</h3>
          <p>{post.fullText || "Тут міг би бути дуже довгий текст вашого поста..."}</p>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;