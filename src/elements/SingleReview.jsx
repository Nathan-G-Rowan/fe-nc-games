import moment from "moment/moment";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getReviewById } from "../utils/api";

import { Comments } from "./Comments/Comments";
import { Vote } from "./Vote";

export const SingleReview = ({ username }) => {
  const { id } = useParams();

  const [review, setReview] = useState();
  const [reviewLoaded, setReviewLoaded] = useState(false);
  const [reviewLoadError, setReviewLoadError] = useState("");

  const [localVotes, setLocalVotes] = useState(0);

  useEffect(() => {
    setReviewLoadError("");

    getReviewById(id)
      .then((responseReview) => {
        setReview(responseReview);
        setReviewLoaded(true);
        setLocalVotes(responseReview.votes);
      })
      .catch((err) => {
        setReviewLoadError(err.response.status);
      });
  }, []);

  if (reviewLoadError)
    return (
      <span className="error"> {reviewLoadError}: couldn't find review</span>
    );

  if (!reviewLoaded) return "Loading Review ...";

  return (
    <div className="SingleReview">
      <div className="spreadLine">
        <h2>{review.title} </h2>
        <span className="noWrap">
          <Vote
            body={review}
            localVotes={localVotes}
            setLocalVotes={setLocalVotes}
          />
        </span>
      </div>
      <p>
        Written by {review.owner},{" "}
        {moment(review.created_at).format("MMM Do YYYY")},
      </p>

      <img src={review.review_img_url} alt="header image of game"></img>
      <p>
        A {review.category} game by {review.designer}
      </p>
      <p>{review.review_body}</p>

      <Comments username={username} />
    </div>
  );
};
