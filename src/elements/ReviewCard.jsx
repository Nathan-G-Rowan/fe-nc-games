import { Link } from "react-router-dom";
import moment from "moment/moment";

export const ReviewCard = ({ id, title, owner, votes, date }) => {
  return (
    <Link to={`/review/${id}`}>
      <li className="card">
        <span className="spreadLine">
          <h3>{title}</h3>
          <span className="noWrap">
            {votes} {votes !== 1 ? "votes" : "vote"}
          </span>
        </span>
        <span className="spreadLine">
          <div>by {owner}</div>
          <div>{moment(date).format("MMM Do YYYY")}</div>
        </span>
      </li>
    </Link>
  );
};
