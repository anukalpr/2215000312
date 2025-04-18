const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let posts = [
    { id: 1, user: "User1", content: "My first post!", likes: 30, comments: 5, timestamp: Date.now() - 50000 },
    { id: 2, user: "User2", content: "Hello world!", likes: 45, comments: 8, timestamp: Date.now() - 40000 },
    { id: 3, user: "User3", content: "This is amazing!", likes: 70, comments: 12, timestamp: Date.now() - 30000 },
    { id: 4, user: "User4", content: "React is fun!", likes: 15, comments: 2, timestamp: Date.now() - 20000 },
    { id: 5, user: "User5", content: "Building a web app!", likes: 95, comments: 20, timestamp: Date.now() - 10000 },
];

app.get("/feed", (req, res) => {
    const sortedPosts = posts.sort((a, b) => b.timestamp - a.timestamp);
    res.json(sortedPosts);
});

app.get("/trending", (req, res) => {
    const trendingPosts = posts.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
    res.json(trendingPosts.slice(0, 5));
});

app.post("/add-post", (req, res) => {
    const { user, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        user,
        content,
        likes: 0,
        comments: 0,
        timestamp: Date.now(),
    };
    posts.push(newPost);
    res.json({ message: "Post added successfully", post: newPost });
});

app.listen(5000, () => console.log("Server running on port 5000"));
