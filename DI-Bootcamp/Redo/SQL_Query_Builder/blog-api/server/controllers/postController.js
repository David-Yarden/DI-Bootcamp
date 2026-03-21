const Post = require('../models/postModel');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ error: 'title and content are required' });
    const [post] = await Post.createPost({ title, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const [post] = await Post.updatePost(req.params.id, { title, content });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.deletePost(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
