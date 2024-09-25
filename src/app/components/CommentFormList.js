import React from "react";

export default function CommentFormList({ commentswithauthor }) {
  return (
    <div>
      <ul>
        {commentswithauthor.map((commentwithauthor) => (
          <li>
            <p>{commentwithauthor.content}</p>
            <p>{commentwithauthor.authorName}</p>
            <p>{commentwithauthor.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
