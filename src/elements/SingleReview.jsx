import { useState, useEffect } from "react";
import { patchReviewVotesById, getCommentsById } from "../utils/api";
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
  const [localVotes, setLocalVotes] = useState(votes);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    getCommentsById(review_id).then((responseComments) => {
      setCommentsLoaded(true);
      setComments(responseComments);
    });
  }, []);

  return (
    <div className="SingleReview">
      <h2>{title} </h2>
      <p>
        Written by {owner} at {created_at.split("T")[0]}
        <button
          disabled={localVotes !== votes}
          onClick={() => {
            patchReviewVotesById(review_id);
            setLocalVotes((currentVotes) => currentVotes + 1);
          }}
        >
          {localVotes} {localVotes > 1 ? "votes" : "vote"} +
        </button>
      </p>
      <p>{votes} votes</p>
      <img src={review_img_url} alt="header image of game"></img>
      <p>
        A {category} game by {designer}
      </p>
      <p>{review_body}</p>
      <p>
        {comment_count} {comment_count !== 1 ? "Comments" : "Comment"}:{" "}
      </p>
      {commentsLoaded ? (
        <ul>
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </ul>
      ) : (
        "Loading Comments"
      )}
    </div>
  );
};
