import { useState, useEffect } from "react";
import {
  patchReviewVotesById,
  getCommentsById,
  postCommentById,
  getReviewById,
} from "../utils/api";
import { CommentCard } from "./CommentCard";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

export const SingleReview = ({ username }) => {
  const { id } = useParams();

  const [review, setReview] = useState();
  const [reviewLoaded, setReviewLoaded] = useState(false);

  const [localVotes, setLocalVotes] = useState(0);
  const [processingVote, setProcessingVote] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    getReviewById(id)
      .then((responseReview) => {
        setLocalVotes(responseReview.votes);
        setReview(responseReview);
        setReviewLoaded(true);
        return getCommentsById(responseReview.review_id);
      })
      .then((responseComments) => {
        setCommentsLoaded(true);
        setComments(responseComments);
      })
      .catch((err) => {
        setReviewLoaded(true);
      });
  }, []);

  const vote = () => {
    if (!processingVote) setProcessingVote(true);
    const inc = localVotes > review.votes ? -1 : 1;
    patchReviewVotesById(review.review_id, inc)
      .then((res) => {
        setLocalVotes((currentVotes) => currentVotes + inc);
        setProcessingVote(false);
      })
      .catch((err) => {
        setProcessingVote(false);
      });
  };

  if (!reviewLoaded) return "Loading Review ...";
  if (!review) return <span className="error">404: couldn't find review</span>;
  return (
    <div className="SingleReview">
      <div className="spreadLine">
        <h2>{review.title} </h2>
        <span className="noWrap">
          {localVotes > 1 ? `${localVotes} votes` : `${localVotes}vote`}{" "}
          <button
            className="voteButton"
            disabled={processingVote}
            onClick={vote}
          >
            {localVotes > review.votes ? "undo▼" : "vote▲"}
          </button>
        </span>
      </div>
      <p>
        Written by {review.owner},{" "}
        {moment(review.created_at).format("MMM Do YYYY")},
      </p>

      <img src={review.review_img_url} alt="header image of game"></img>
      <p>
        A {review.category} game by {review.designer}
      </p>
      <p>{review.review_body}</p>

      {comments.length === 0 ? null : (
        <h3>
          {comments.length} {comments.length !== 1 ? "Comments" : "Comment"}:
        </h3>
      )}

      {commentsLoaded ? (
        <ul>
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
          <h3>Comment:</h3>
          <form>
            <textarea
              name="comments"
              id="comments"
              placeholder="Write your comment ..."
              value={newCommentText}
              onChange={(e) => {
                setNewCommentText(e.target.value);
              }}
            ></textarea>

            <button
              disabled={postingComment}
              onClick={(event) => {
                setPostingComment(true);
                event.preventDefault();
                postCommentById(review.review_id, newCommentText, username)
                  .then(({ comment }) => {
                    setNewCommentText("");
                    setPostingComment(false);
                    setComments((currentComments) => [
                      ...currentComments,
                      comment,
                    ]);
                  })
                  .catch((error) => {
                    setPostingComment(false);
                  });
              }}
            >
              Submit Comment
            </button>
          </form>
        </ul>
      ) : (
        "Loading Comments"
      )}
    </div>
  );
};
