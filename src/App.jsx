import React, { useState } from 'react';
import Comment from './components/Comment';
import { useForm } from 'react-hook-form';

function App() {
    const [comments, setComments] = useState([
        { id: 1, text: 'This is a comment', replies: [], level: 0 },
    ]);

    const addReply = (id, text) => {
        const newComments = [...comments];
        const addReplyRecursive = (commentsArray, commentId) => {
            for (let comment of commentsArray) {
                if (comment.id === commentId) {
                    comment.replies.push({
                        id: Date.now(),
                        text: text,
                        replies: [],
                        level: comment.level + 1,
                    }); 
                    return;
                }
                addReplyRecursive(comment.replies, commentId); // recursion
            }
        };
        addReplyRecursive(newComments, id);
        setComments(newComments);
    };

    return (
        <div className="bg-gray-900 text-white p-10 min-h-screen">
            <h2 className="text-2xl font-bold mb-5">Comment System</h2>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} addReply={addReply} />
            ))}
        </div>
    );
}

export default App;
