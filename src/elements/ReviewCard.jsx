export const ReviewCard = ({ id, title, owner, votes, date }) => {
  return (
    <li className="ReviewCard">
      <h3>{title}</h3>
      <span>
        {owner} <br />
        {date} votes:{votes}
      </span>
    </li>
  );
};
