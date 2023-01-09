import { useEffect, useState } from "react";
import { getReviews } from "../utils/api";
import { ReviewCard } from "./ReviewCard";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [organise, setOrganise] = useState({
    category: undefined,
    sort_by: "date",
    orderDesc: true,
  });

  useEffect(() => {
    getReviews(organise.category, organise.sort_by, organise.orderDesc).then(
      (reviews) => setReviews(reviews)
    );
  }, [organise]);

  return (
    <section className="ReviewList">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard
            title={review.title}
            owner={review.owner}
            votes={review.votes}
            date={review.created_at.split("T")[0]}
          />
        ))
      ) : (
        <p>nothing seems to be here...</p>
      )}
    </section>
  );
};
