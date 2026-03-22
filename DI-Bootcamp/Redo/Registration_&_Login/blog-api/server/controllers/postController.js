const Post = require('../models/postModel');

// GET /posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /posts/:id
const getPostById = async (req, res) => {
  try {
    const post = await Post.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /posts
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'title and content are required' });
    }
    const [post] = await Post.createPost({ title, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /posts/:id
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const fields = {};
    if (title) fields.title = title;
    if (content) fields.content = content;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ error: 'No fields provided to update' });
    }

    const [post] = await Post.updatePost(req.params.id, fields);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /posts/:id
const deletePost = async (req, res) => {
  try {
    const count = await Post.deletePost(req.params.id);
    if (count === 0) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
