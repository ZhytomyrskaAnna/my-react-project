import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../molecules/SearchBar/SearchBar.jsx';
import Button from '../../atoms/Button/Button.jsx';
import Post from '../../molecules/Post/Post.jsx';
import { postsData } from '../../../data.js';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = postsData.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="section">
      <h2>Стрічка новин (Feed)</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div style={{ display: 'flex', gap: '8px', margin: '12px 0' }}>
        {['All', 'React', 'Not React'].map((cat) => (
          <Button
            key={cat}
            children={cat}
            onClick={() => setActiveCategory(cat)}
            variant={activeCategory === cat ? 'primary' : 'secondary'}
          />
        ))}
      </div>
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} style={{ marginBottom: '16px' }}>
              <Post {...post} />
              <Link
                to={`/feed/${post.id}`}
                style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  color: '#007bff',
                }}
              >
                Читати повністю (динамічний URL) →
              </Link>
            </div>
          ))
        ) : (
          <p>"Нічого не знайдено за вашим запитом."</p>
        )}
      </div>
    </section>
  );
};

export default Feed;