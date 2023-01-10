import { useParams, useLocation, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { SingleReview } from "./SingleReview";
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
        console.log(err);
      });
  }, []);

  return (
    <div className="reviewRouter">
      {isLoaded ? (
        reviewData ? (
          <Routes>
            <Route
              path="/"
              element={<SingleReview reviewData={reviewData} />}
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
