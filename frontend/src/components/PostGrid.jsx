import React, { useEffect, useState } from 'react';
import CreateComment from './CreateComment';
import './PostGrid.css';

const PostGrid = ({ posts, token }) => {
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/comments')
      .then(response => response.json())
      .then(data => setComments(data));
  }, []);

  const handleDeletePost = async (postId) => {
    const response = await fetch(`http://localhost:3000/api/admin/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleDeleteComment = async (commentId) => {
    const response = await fetch(`http://localhost:3000/api/admin/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.ok) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  return (
    <div className="post-grid">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {token && <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>}
          <CreateComment postId={post.id} token={token} />
          <div className='comments'>
            <h3>Comments:</h3>
            {comments.filter(comment => comment.postId === post.id).map(comment => (
              <div key={comment.id} className='comment'>
                <p>{comment.content}</p>
                {token && <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;