import React from "react";
import { useState } from "react";

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addComment(comment);
        setComment("");
      }}
    >
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  );
};

export default CommentForm;
