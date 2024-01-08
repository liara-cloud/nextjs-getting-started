// pages/index.js
import React from 'react';
import connectDB from './api/db';
import Post from '../models/Post';
<<<<<<< HEAD
import Layout from '../components/Dashboard_Layout.js';
=======
import Layout from '../components/inLayout';
import styles from '../styles/showpost.module.css';
>>>>>>> upload-using-s3

const Home = ({ posts }) => {
  return (
    <Layout>
      <div>
<<<<<<< HEAD
        <h1>My Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
=======
        <h1>Liara Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post._id} className={styles.postContainer}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postContent}>{post.content}</p>
              {post.image && <img src={`/uploads/${post.image}`} alt={post.title} className={styles.postImage} />}
>>>>>>> upload-using-s3
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
