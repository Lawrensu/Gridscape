import React, { useState } from 'react';

const CreateComment = ({ token, postId }) => { // Add postId as a prop to CreateComment
    const [content, setContent] = useState(''); // Change title to content

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        const response = await fetch(`http://localhost:3000/api/comments`, { // Change the URL to /api/comments
            method: 'POST', // Change the method to POST
            headers: { // Add the Authorization header
                'Content-Type': 'application/json', // Specify the content type
                'Authorization': `Bearer ${token}`, // Add the Authorization header
            },
            body: JSON.stringify({ // Convert the data to JSON
                content, // Add the content to the body 
                postId // Add the postId to the body
            }),
        });
        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the response
    };  

    return ( // Update the form to include the content field
        <form onSubmit={handleSubmit}>  // Add the handleSubmit function to the form
            <h2>Add Comment</h2> // Change the heading to Add Comment
            <div> 
                <label>Comment:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea> // Add the content field. value is set to content and onChange updates the content state
            </div>
            <button type="submit">Add</button>
        </form>
    );
};

export default CreateComment;


