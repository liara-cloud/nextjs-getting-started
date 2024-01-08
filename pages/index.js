// pages/index.js
import React from 'react';
import connectDB from './api/db';
import Post from '../models/Post';
import Layout from '../components/Layout';
import styles from '../styles/showpost.module.css';

const Home = ({ posts }) => {
  return (
    <Layout>
      <div>
        <h1>Liara Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post._id} className={styles.postContainer}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postContent}>{post.content}</p>
              {post.image && <img src={`${post.image}`} alt={post.title} className={styles.postImage} />}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  await connectDB();
  const posts = await Post.find().populate('author').exec();
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}

export default Home;
