export const SingleReview = ({
  reviewData: {
    title,
    owner,
    created_at,
    category,
    designer,
    review_img_url,
    review_body,
    votes,
    comment_count,
  },
}) => {
  return (
    <div className="SingleReview">
      <h2>{title}</h2>
      <p>
        By {owner} at {created_at.split("T")[0]}
      </p>
      <p>{votes} votes</p>
      <img src={review_img_url} alt="header image of game"></img>
      <p>
        A {category} game by {designer}
      </p>
      <p>{review_body}</p>
      <p>{votes} votes</p>
      <p>{comment_count} comments</p>
    </div>
  );
};
