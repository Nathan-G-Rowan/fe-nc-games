import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { getReviews, getCategories } from "../../utils/api";

import "./Reviews.css";
import { CategoryDropdown } from "./OrganiseOptions";
import { ReviewCard } from "./ReviewCard";

export const Reviews = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [categoryError, setCategoryError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [organise, setOrganise] = useState({
    category: searchParams.get("category"),
    sort_by: searchParams.get("sort_by")
      ? searchParams.get("sort_by")
      : "created_at",
    order: !!searchParams.get("order"),
  });

  useEffect(() => {
    setOrganise({
      category: searchParams.get("category"),
      sort_by: searchParams.get("sort_by")
        ? searchParams.get("sort_by")
        : "created_at",
      order: !!searchParams.get("order"),
    });
    getCategories().then((resCategories) => setCategories(resCategories));
  }, []);

  useEffect(() => {
    const params = {};
    let realCategory = false;
    categories.forEach((category) => {
      if (organise.category === category.slug) realCategory = true;
    });

    if (realCategory) params.category = organise.category;
    if (organise.sort_by && organise.sort_by !== "created_at")
      params.sort_by = organise.sort_by;
    if (organise.order) params.order = true;
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...params,
      }).toString(),
    });
  }, [organise]);

  useEffect(() => {
    if (!organise.sort_by) organise.sort_by = "created_at";
    setIsLoaded(false);
    setReviews([]);

    getReviews(
      searchParams.get("category"),
      searchParams.get("sort_by"),
      searchParams.get("order")
    )
      .then((reviews) => {
        setCategoryError(false);
        setIsLoaded(true);
        setReviews(reviews);
      })
      .catch((error) => {
        setCategoryError(true);
      });
  }, [searchParams]);

  return (
    <section className="ReviewList">
      <CategoryDropdown
        organise={organise}
        setOrganise={setOrganise}
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
