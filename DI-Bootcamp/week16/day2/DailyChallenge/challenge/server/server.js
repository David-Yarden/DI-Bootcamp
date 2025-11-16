import express from "express";

const app = express();
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send("Hello From Express");
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
