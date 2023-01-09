export const ReviewCard = ({ title, owner, votes, date }) => {
  return (
    <div className="ReviewCard">
      <h3>{title}</h3>
      <span>
        {owner} <br />
        {date} votes:{votes}
      </span>
    </div>
  );
};
