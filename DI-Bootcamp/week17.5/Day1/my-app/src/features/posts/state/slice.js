import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: ''
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    incrementLike: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) post.reactions.like += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const postsWithReactions = action.payload.map(post => ({
          ...post,
          reactions: { like: 0 }
        }));
        state.posts = postsWithReactions;
      })
      .addCase(fetchPosts.rejected, (state) => { state.status = 'failed'; });
  }
});

export const { incrementLike } = postsSlice.actions;
export default postsSlice.reducer;
