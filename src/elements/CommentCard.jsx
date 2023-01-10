export const CommentCard = ({ comment }) => {
  console.log(comment);
  return (
    <li Key={comment.comment_id} className="commentCard">
      {comment.author} said:{" "}
      <span className="rightAlign">{comment.created_at.split("T")[0]} </span>
      <br />
      {comment.votes} {comment.votes > 1 ? "votes" : "vote"}
      <br />
      {comment.body}
    </li>
  );
};
