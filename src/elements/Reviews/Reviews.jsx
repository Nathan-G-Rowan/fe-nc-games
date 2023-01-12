import { useEffect, useState } from "react";
import { getReviews } from "../../utils/api";
import { ReviewCard } from "./ReviewCard";

export const Reviews = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [organise, setOrganise] = useState({
    category: undefined,
    sort_by: "date",
    orderDesc: true,
  });

  useEffect(() => {
    getReviews(organise.category, organise.sort_by, organise.orderDesc).then(
      (reviews) => {
        setIsLoaded(true);
        setReviews(reviews);
      }
    );
  }, [organise]);

  return (
    <section className="ReviewList">
      {isLoaded ? (
        reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <ReviewCard key={review.review_id} review={review} />
            ))}
          </ul>
        ) : (
          <p>nothing seems to be here...</p>
        )
      ) : (
        <p>Loading Reviews</p>
      )}
    </section>
  );
};
