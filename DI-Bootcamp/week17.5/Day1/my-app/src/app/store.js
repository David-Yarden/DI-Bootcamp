import {configureStore, combineReducers} from '@reduxjs/toolkit';
import postsReducer from '../features/posts/state/slice';


const store = configureStore({
  reducer: {
    posts: postsReducer
  }
});

export default store;
