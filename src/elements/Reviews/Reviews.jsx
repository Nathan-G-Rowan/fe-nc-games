import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReviews, getCategories } from "../../utils/api";

import { CategoryDropdown } from "./CategoryDropdown";
import { ReviewCard } from "./ReviewCard";

export const Reviews = () => {
  const navigate = useNavigate();
  const { category_slug } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [categoryError, setCategoryError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [organise, setOrganise] = useState({
    category: category_slug,
    sort_by: "date",
    orderDesc: true,
  });

  useEffect(() => {
    getCategories().then((resCategories) => setCategories(resCategories));
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    setReviews([]);

    getReviews(organise.category, organise.sort_by, organise.orderDesc)
      .then((reviews) => {
        setCategoryError(false);
        setIsLoaded(true);
        setReviews(reviews);
      })
      .catch((error) => {
        setCategoryError(true);
      });
  }, [organise]);

  return (
    <section className="ReviewList">
      <CategoryDropdown
        organise={organise}
        setOrganise={setOrganise}
        category_slug={category_slug}
        categories={categories}
        navigate={navigate}
      />

      {categoryError ? (
        <div className="error">Missing Category</div>
      ) : isLoaded ? (
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
