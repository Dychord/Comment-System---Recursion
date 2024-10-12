import React, { useState } from "react";

function Comment({ comment, addReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    addReply(comment.id, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div style={{ marginLeft: comment.level * 20 }} className="mb-4">
      <div className="bg-gray-800 text-white p-4 rounded-md border border-black">
        <h3 className="font-semibold">{comment.text}</h3>
        <button onClick={() => setIsReplying(!isReplying)} className="mt-2 text-blue-400 hover:text-blue-300">
          Reply
        </button>
      </div>

      {isReplying && (
        <div className="mt-2">
          <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Reply..." className="px-2 py-1 border border-gray-600 rounded-md text-black outline-none"/>
          <button onClick={handleReply} className="ml-2 bg-blue-500 text-white px-4 py-1  rounded-md hover:bg-blue-600" >
            Submit
          </button>
        </div>
      )}

      {/* Recursively render replies */}
      {comment.replies.length > 0 &&
        comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} addReply={addReply} />
        ))}
    </div>
  );
}

export default Comment;
