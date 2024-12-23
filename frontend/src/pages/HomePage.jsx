// Desc: Home page component that fetches posts from the backend and displays them in a grid
// using the PostGrid component. The PostGrid component is imported and used to display
// the posts in a grid format. The posts are fetched from the backend using the fetch API
// and stored in the state using the useState hook. The useEffect hook is used to fetch the
// posts when the component mounts. The posts are then passed as a prop to the PostGrid

import React, { useEffect, useState} from "react";
import PostGrid from "../components/PostGrid";
import { response } from "express";

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/posts")
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <PostGrid posts={posts} />
        </div>
    );
};

export default HomePage;