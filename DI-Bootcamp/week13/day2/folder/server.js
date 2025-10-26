const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
];

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find(item => item.id == id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
});