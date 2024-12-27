// component to display grid of posts
// display posts and comments

import React, { useEffect } from 'react';
import CreateComment from './CreateComment';
import './PostGrid.css';

const PostGrid = ({ posts, token }) => {
    const [comments, setComments] = React.useState({});

    useEffect(() => { // fetches comments from the backend when the component mounts
        fetch('http://localhost:3000/api/comments')
            .then(response => response.json())
            .then(data => setComments(data));
    }, []);

    return (
        <div className="post-grid">
            {posts.map(post => (
                <div key={post.id} className="post>">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>

                    <CreateComment postId={post.id} token={token} /> // Add the CreateComment component to the PostGrid component and pass the postId and token as props

                    <div className='comments'>
                        <h3>Comments:</h3>

                        // Filters comments to display only those related to the current post
                        {comments.filter(comment => comment.postId === post.id).map(comment => (
                            <div key={comment.id} className='comment'>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostGrid;