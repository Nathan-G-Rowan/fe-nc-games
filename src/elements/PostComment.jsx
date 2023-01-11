import "./PostComment.css";

import { useNavigate } from "react-router-dom";

export const PostComment = ({ reviewData }) => {
  const navigate = useNavigate();

  return (
    <div className="PostComment">
      <h3>Commenting on:</h3>
      <h2>{reviewData.title}</h2>
      <form>
        <input type="text" />
        <br />
        <button
          onClick={(event) => {
            event.preventDefault();
            navigate(`/review/${reviewData.review_id}`);
          }}
        >
          Submit Comment
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            navigate(`/review/${reviewData.review_id}`);
          }}
        >
          Back to Review
        </button>
      </form>
    </div>
  );
};
