import React from "react";

export default function QuestionCard({
  title,
  description,
  tag,
  author,
  date,
  answers
}) {
  return (
    <div className="question-card">

      <h3>{title}</h3>

      <p className="desc">{description}</p>

      <div className="tag">#{tag}</div>

      <div className="meta">
        <span>Asked by {author}</span>
        <span>{date}</span>
        <span>{answers} Answers</span>
      </div>

      <div className="actions">
        <button className="view">View</button>
        <button className="bookmark">Bookmark</button>
      </div>

    </div>
  );
}