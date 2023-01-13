import moment from "moment/moment";
import { useState } from "react";
import { deleteCommentById } from "../../utils/api";

export const CommentCard = ({ comment, username, setComments }) => {
  const [deletingComment, setDeletingComment] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);

  const updateComment = (id, text) => {
    setComments((currentComments) => {
      return currentComments.map((currentComment) => {
        const newComment = { ...currentComment };

        if (newComment.comment_id === id) newComment.deleting = text;
        return newComment;
      });
    });
  };

  const deleteComment = (e) => {
    setDeletingComment(true);
    updateComment(comment.comment_id, "Deleting...");

    deleteCommentById(comment.comment_id)
      .then(() => {
        setCommentDeleted(true);
        updateComment(comment.comment_id, "Deleted");
      })

      .catch((err) => {
        setDeletingComment(false);
        updateComment(
          comment.comment_id,
          "Delete Failed: " + err.response.status
        );
      });
  };

  return (
    <li className="card">
      <div className="spreadLine">
        <div className="flexLine">
          <h3>{comment.author === username ? "You" : comment.author} said:</h3>
          {comment.deleting ? <div>{comment.deleting}</div> : null}
        </div>
        <span className="noWrap">
          {comment.votes} {comment.votes !== 1 ? "votes" : "vote"}
        </span>
      </div>
      {comment.body}
      <br />
      <div className="spreadLine">
        {moment(comment.created_at).format("MMM Do YYYY")}
        {comment.author === username && !commentDeleted ? (
          <button onClick={deleteComment} disabled={deletingComment}>
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
};
