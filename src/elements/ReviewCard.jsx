import { Link } from "react-router-dom";

export const ReviewCard = ({ id, title, owner, votes, date }) => {
  return (
    <Link to={`/review/${id}`}>
      <li className="card">
        <h3>{title}</h3>
        <span>
          {owner} <br />
          {date} <br />
          {votes} {votes !== 1 ? "votes" : "vote"}
        </span>
      </li>
    </Link>
  );
};
