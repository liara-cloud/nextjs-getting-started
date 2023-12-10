// pages/index.js
import React from 'react';
import connectDB from './api/db';
import Post from '../models/Post';
import Layout from '../components/inLayout';

const Home = ({ posts }) => {
  return (
    <Layout>
      <div>
        <h1>My Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
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
