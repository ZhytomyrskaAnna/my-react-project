import React, { useState } from 'react';
import Card from "../../molecules/Card/Card.jsx";
import Button from "../../atoms/Button/Button.jsx";
import { postsData as initialPosts } from "../../../data.js";
import styles from "./Lab3.module.css";

const Lab3 = () => {
  // Створюємо стан для списку постів, щоб ми могли їх видаляти
  const [posts, setPosts] = useState(initialPosts);

  // Функція для видалення поста
  const handleDelete = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
  };

  // Компонент всередині компонента для демонстрації локального стану лайків
  const InteractivePost = ({ post, onDelete }) => {
    const [likes, setLikes] = useState(post.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    };

    return (
      <Card>
        <div className={styles.postHeader}>
          <img src={post.avatar} alt="avatar" className={styles.avatar} />
          <div>
            <h4 className={styles.author}>{post.author}</h4>
            <span className={styles.date}>{post.date}</span>
          </div>
        </div>
        
        <p className={styles.content}>{post.content}</p>
        
        <div className={styles.footer}>
          <div className={styles.stats}>
            <span className={isLiked ? styles.activeLike : ""}>
              ❤️ {likes}
            </span>
          </div>
          
          <div className={styles.actions}>
            <Button 
              variant={isLiked ? "primary" : "secondary"} 
              onClick={handleLike}
            >
              {isLiked ? "Дякуємо!" : "Лайк"}
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={() => onDelete(post.id)}
            >
              Видалити
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>Інтерактивна взаємодія (Lab 3)</h1>
        
        {posts.length > 0 ? (
          <div className={styles.feed}>
            {posts.map(post => (
              <InteractivePost 
                key={post.id} 
                post={post} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Ви видалили всі пости! </p>
            <Button onClick={() => setPosts(initialPosts)}>Відновити список</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Lab3;