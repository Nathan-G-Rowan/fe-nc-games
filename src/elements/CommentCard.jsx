import moment from "moment/moment";

export const CommentCard = ({ comment }) => {
  return (
    <li Key={comment.comment_id} className="commentCard">
      {moment(comment.created_at).format("MMM Do YYYY")}
      <br /> {comment.author} said: <br />
      {comment.votes} {comment.votes !== 1 ? "votes" : "vote"}
      <br />
      {comment.body}
    </li>
  );
};
