import React, { useState } from 'react';
import Header from "../../organisma/Header.jsx";
import Button from "../../atoms/Button/Button.jsx";
import SearchBar from "../../molecules/SearchBar/SearchBar.jsx";
import Post from "../../molecules/Post/Post.jsx";
import { postsData, categories } from '../../../data';
import styles from './Practice3.module.css';

const Practice3 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Логіка фільтрації
  const filteredPosts = postsData.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.content}>
        <h1 className={styles.title}>Стрічка новин (Practice 3)</h1>

        {/* Пошук */}
        <div className={styles.searchWrapper}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>

        {/* Фільтрація за категоріями */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              variant={activeCategory === cat ? "primary" : "secondary"}
              className={activeCategory === cat ? styles.activeBtn : ""}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Список постів */}
        <section className={styles.postsList}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post key={post.id} {...post} />
            ))
          ) : (
            <p className={styles.emptyMsg}>
              Нічого не знайдено за запитом "{searchTerm}" у категорії {activeCategory} 🔎
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Practice3;