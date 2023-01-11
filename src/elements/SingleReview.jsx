import { useState, useEffect } from "react";
import { patchReviewVotesById, getCommentsById } from "../utils/api";
import { CommentCard } from "./CommentCard";
import moment from "moment/moment";

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
  const [processingVote, setProcessingVote] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    getCommentsById(review_id).then((responseComments) => {
      setCommentsLoaded(true);
      setComments(responseComments);
    });
  }, []);

  const vote = () => {
    if (!processingVote) setProcessingVote(true);
    const inc = localVotes > votes ? -1 : 1;
    patchReviewVotesById(review_id, inc)
      .then((res) => {
        setLocalVotes((currentVotes) => currentVotes + inc);
        setProcessingVote(false);
      })
      .catch((err) => {
        setProcessingVote(false);
      });
  };

  return (
    <div className="SingleReview">
      <div className="spreadLine">
        <h2>{title} </h2>
        <div className="noWrap">
          {localVotes > 1 ? `${localVotes} votes` : `${localVotes}vote`}{" "}
          <button
            className="voteButton"
            disabled={processingVote}
            onClick={vote}
          >
            {localVotes > votes ? "▼undo" : "▲vote"}
          </button>
        </div>
      </div>

      <p>
        Written by {owner}, {moment(created_at).format("MMM Do YYYY")},
      </p>

      <img src={review_img_url} alt="header image of game"></img>
      <p>
        A {category} game by {designer}
      </p>

      <p>{review_body}</p>

      <h3>
        {comment_count} {comment_count !== 1 ? "Comments" : "Comment"}:{" "}
      </h3>
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
