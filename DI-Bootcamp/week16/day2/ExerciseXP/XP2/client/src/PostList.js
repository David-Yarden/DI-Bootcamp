import posts from "./posts.json";

function PostList() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Hi This is a Title</h1>

      {posts.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
