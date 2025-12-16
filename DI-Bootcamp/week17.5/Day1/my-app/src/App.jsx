// src/App.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, incrementLike } from "./features/posts/state/slice";

export default function App() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLike = (id) => {
    dispatch(incrementLike(id));
  }

  return (
    <div>
      <h1>Posts</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error fetching posts.</p>}
      {status === "succeeded" &&
        posts.map(post => (
          <div key={post.id} style={{ borderBottom: "1px solid #ccc", margin: "8px 0", paddingBottom: "8px" }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => handleLike(post.id)}>
              👍 {post.reactions.like}
            </button>
          </div>
        ))}
    </div>
  );
}
