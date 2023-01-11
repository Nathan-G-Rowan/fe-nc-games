import { useParams, useLocation, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { SingleReview } from "./SingleReview";
import { PostComment } from "./PostComment";
import { getReviewById } from "../utils/api";

export const ReviewRouter = () => {
  const url = useLocation();
  const { id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewData, setReviewData] = useState();

  useEffect(() => {
    getReviewById(id)
      .then((review) => {
        setReviewData(review);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
      });
  }, []);

  return (
    <div className="reviewRouter">
      {isLoaded ? (
        reviewData ? (
          <Routes>
            <Route
              path="/"
              element={
                <SingleReview
                  Key={reviewData.review_id}
                  reviewData={reviewData}
                />
              }
            />
            <Route
              path="/comment"
              element={<PostComment reviewData={reviewData} />}
            />
          </Routes>
        ) : (
          <p className="error">404: Missing Review!</p>
        )
      ) : (
        <p>Loading Review</p>
      )}
    </div>
  );
};
