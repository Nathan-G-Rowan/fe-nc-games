import { useState, useEffect } from "react";
import { getCommentsById } from "../utils/api";
import { CommentCard } from "./CommentCard";

export const SingleReview = ({
  reviewData: {
    review_id,
    title,
    owner,
    created_at,
    category,
    designer,
    review_img_url,
    review_body,
    votes,
    comment_count,
  },
}) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsById(review_id).then((serverComments) =>
      setComments(serverComments)
    );
  }, []);

  return (
    <div className="SingleReview">
      <h2>{title}</h2>
      <p>
        By {owner} at {created_at.split("T")[0]}
      </p>
      <p>
        {votes} {votes > 1 ? "votes" : "vote"}
      </p>
      <img src={review_img_url} alt="header image of game"></img>
      <p>
        A {category} game by {designer}
      </p>
      <p>{review_body}</p>
      <p>
        {votes} {votes > 1 ? "votes" : "vote"} <br />
        {comment_count} {comment_count > 1 ? "comments" : "comment"}:{" "}
      </p>
      <ul>
        {comments.map((comment) => (
          <CommentCard comment={comment} />
        ))}
      </ul>
    </div>
  );
};
