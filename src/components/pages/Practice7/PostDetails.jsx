import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const postsData = [
  { id: 1, title: "Вивчення React Router", body: "React Router — це стандартна бібліотека для маршрутизації в React. Вона дозволяє створювати односторінкові додатки (SPA) з навігацією без перезавантаження сторінки." },
  { id: 2, title: "Новини JavaScript", body: "JavaScript продовжує розвиватися з новими можливостями ES2024. Очікуйте покращення в роботі з асинхронністю та нові методи масивів." },
  { id: 3, title: "Що нового у Vite", body: "Vite 5 приносить ще швидшу розробку та покращену підтримку плагінів. Це робить старт нових проектів ще приємнішим." },
  { id: 4, title: "Робота з URL параметрами", body: "useParams та useSearchParams — ключові хуки для динамічних додатків. Вони дозволяють синхронізувати стан вашого додатку безпосередньо з адресним рядком." },
];

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    
    const foundPost = postsData.find(p => p.id === parseInt(postId));
    setPost(foundPost);
  }, [postId]);

  if (!post) return <div style={{ padding: '20px' }}><p>Завантаження поста #{postId}...</p></div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/practice7" style={{ display: 'inline-block', marginBottom: '20px', color: '#007bff', textDecoration: 'none' }}>
        &larr; Назад до стрічки
      </Link>
      <div style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ marginTop: 0 }}>{post.title}</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#333' }}>{post.body}</p>
        <div style={{ marginTop: '20px', color: '#666' }}>
          <small>ID поста: {post.id}</small>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;