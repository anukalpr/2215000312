import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000"; 

function App() {
    const [feed, setFeed] = useState([]);
    const [trending, setTrending] = useState([]);
    const [newPost, setNewPost] = useState({ user: "", content: "" });

    useEffect(() => {
        fetch(`${API_URL}/feed`)
            .then((res) => res.json())
            .then((data) => setFeed(data));
        
        fetch(`${API_URL}/trending`)
            .then((res) => res.json())
            .then((data) => setTrending(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/add-post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
        });
        const result = await response.json();
        alert(result.message);
        setFeed([result.post, ...feed]);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Social Feed</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="User" 
                    value={newPost.user} 
                    onChange={(e) => setNewPost({ ...newPost, user: e.target.value })} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Write a post..." 
                    value={newPost.content} 
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} 
                    required 
                />
                <button type="submit">Post</button>
            </form>

            <h2>Trending Posts</h2>
            {trending.map((post) => (
                <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                    <strong>{post.user}</strong>: {post.content}
                    <p>❤️ {post.likes} | 💬 {post.comments}</p>
                </div>
            ))}

            <h2>Recent Feed</h2>
            {feed.map((post) => (
                <div key={post.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                    <strong>{post.user}</strong>: {post.content}
                    <p>❤️ {post.likes} | 💬 {post.comments}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
