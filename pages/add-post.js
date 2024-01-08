// pages/add-post.js
import { useState } from 'react';
import Layout from '../components/inLayout';
import styles from '../styles/add-post.module.css';
import { useRouter } from 'next/router';

const AddPostPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      const response = await fetch('/api/add-post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('پست با موفقیت ارسال شد.');
        // Redirect or show a success message
        router.push('/dashboard')
      } else {
        console.error('خطا در ارسال پست.');
        // Handle error
      }
    } catch (error) {
      console.error('Error during post creation:', error);
      // Handle error
    }
  };

  return (
    <Layout>
      <div className={styles.addPostContainer}>
        <h1>Add Post</h1>
        <form onSubmit={handlePostSubmit}>
          <label className={styles.formLabel}>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.formInput} />
          </label>
          <br />
          <label className={styles.formLabel}>
            Content:
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className={styles.formTextarea} />
          </label>
          <br />
          <label className={styles.formLabel}>
            Image:
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={styles.formInput} />
          </label>
          <br />
          <button type="submit" className={styles.formButton}>
            Add Post
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddPostPage;
