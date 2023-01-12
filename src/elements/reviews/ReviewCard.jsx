import { Link } from "react-router-dom";
import moment from "moment/moment";

export const ReviewCard = ({
  review: { comment_count, review_id, title, owner, votes, date },
}) => {
  return (
    <Link to={`/review/${review_id}`}>
      <li className="hoverCard">
        <span className="spreadLine">
          <h3>{title}</h3>

          <span className="noWrap">
            {votes} {votes !== 1 ? "votes" : "vote"}
          </span>
        </span>

        <div>by {owner}</div>

        <span className="wrapLine">
          <span>{moment(date).format("MMM Do YYYY")}</span>

          <span>
            {comment_count} {comment_count === 1 ? "comment" : "comments"}
          </span>
        </span>
      </li>
    </Link>
  );
};
