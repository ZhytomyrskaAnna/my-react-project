import React, { useState } from 'react';
import Post from "../../molecules/Post/Post.jsx";
import { postsData } from "../../../data.js";
import styles from "./Lab2.module.css";

const Lab2 = () => {

  
  return (
    <div className={styles.appContainer}>
      <main className={styles.content}>
        <h1 className={styles.title}>Стрічка новин (Lab 2)</h1>
        
        <div className={styles.feed}>
          {postsData.map((post) => (
            
            <Post key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Lab2;