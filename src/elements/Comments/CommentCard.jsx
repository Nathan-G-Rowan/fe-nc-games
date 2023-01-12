import moment from "moment/moment";

export const CommentCard = ({ comment }) => {
  return (
    <li className="card">
      <div className="spreadLine">
        <h3>{comment.author} said:</h3>
        <span className="noWrap">
          {comment.votes} {comment.votes !== 1 ? "votes" : "vote"}
        </span>
      </div>
      {comment.body}
      <br />
      {moment(comment.created_at).format("MMM Do YYYY")}
    </li>
  );
};
