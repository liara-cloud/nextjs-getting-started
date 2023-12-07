// pages/index.js
import React from 'react';
import connectDB from './api/db';
import Post from '../models/Post';
import Layout from '../components/Dashboard_Layout.js';
import { authenticate } from '../middlewares/auth';

const Home = ({ posts, user }) => {
  return (
    <Layout>
      <div>
        <h2>Liara Blog</h2>
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

export async function getServerSideProps(context) {
  const { req, res } = context;
  await connectDB();
  const session = await authenticate(req, res);

  const posts = await Post.find().populate('author').exec();

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)), user: null },
  };
}

export default Home;
