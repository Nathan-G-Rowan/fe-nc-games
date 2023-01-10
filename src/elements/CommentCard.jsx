import moment from "moment/moment";

export const CommentCard = ({ comment }) => {
  return (
    <li className="card">
      {moment(comment.created_at).format("MMM Do YYYY")} <br />
      {comment.votes} {comment.votes !== 1 ? "votes" : "vote"} <br />
      {comment.author} said: <br />
      {comment.body}
    </li>
  );
};
