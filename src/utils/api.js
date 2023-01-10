import axios from "axios";

const dataApi = axios.create({
  baseURL: "https://table-of-tops.onrender.com/api",
});

export const getUsers = () => {
  return dataApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getReviews = (category, sortBy = "date", orderDesc = true) => {
  return dataApi.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};
export const getReviewById = (id) => {
  return dataApi.get(`/reviews/${id}`).then(({ data }) => {
    return data.review;
  });
};
