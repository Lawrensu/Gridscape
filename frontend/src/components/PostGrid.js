//  component to display grid of posts

import React from 'react';

const PostGrid = ({ posts }) => {
    return (
        <div className="post-grid">
            {posts.map(post => (
                <div key={post.id} className="post>">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default PostGrid;