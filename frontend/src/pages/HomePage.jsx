import React, { useEffect, useState } from "react";
import PostGrid from "../components/PostGrid";
import CreatePost from "../components/CreatePost";
import Loading from "../components/Loading";
import './HomePage.css';

const HomePage = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
        setTimeout(() => setShowContent(true), 500);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false);
      });
  }, []);

  console.log('HomePage component rendered');

  if (loading) {
    return <Loading />;
  }

  if (!showContent) {
    return null;
  }

  return (
    <div className="homepage">
      <h1>Gridscape</h1>
      {token && <CreatePost token={token} />}
      <PostGrid posts={posts} token={token} />
    </div>
  );
};

export default HomePage;