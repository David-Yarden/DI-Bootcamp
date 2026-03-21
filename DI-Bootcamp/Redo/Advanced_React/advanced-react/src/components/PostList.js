import React from 'react';
import posts from '../data/posts.json';

function PostList() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Hi This is a Title</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
