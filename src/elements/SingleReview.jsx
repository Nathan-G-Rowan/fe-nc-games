import { useState, useEffect } from "react";
import { patchReviewVotesById } from "../utils/api";

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
  const [localVotes, setLocalVotes] = useState();
  useEffect(() => {
    setLocalVotes(votes);
  }, [votes]);

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

      <img src={review_img_url} alt="header image of game"></img>
      <p>
        A {category} game by {designer}
      </p>
      <p>{review_body}</p>
      <p>{comment_count} comments</p>
    </div>
  );
};
