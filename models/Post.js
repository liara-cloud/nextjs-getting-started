import mongoose from 'mongoose';

let Post;

try {
  Post = mongoose.model('Post');
} catch {
  const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }, 
    image: { type: String },
  });

  Post = mongoose.model('Post', postSchema);
}

export default Post;
