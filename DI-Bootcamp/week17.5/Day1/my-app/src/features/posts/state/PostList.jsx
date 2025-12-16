import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchPosts} from "./state/slice";
import LikeButton from "./LikeButton";

export default function PostsList() {
    const posts = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);
  return (
    <>
      <h2>PostsList</h2>
      <section>
      {
        posts && posts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <LikeButton {...post} />
          </article>
        ))
      }
      </section>
    </>
  );
}