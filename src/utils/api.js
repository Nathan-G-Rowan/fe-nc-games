import axios from "axios";

const dataApi = axios.create({
  baseURL: "https://table-of-tops.onrender.com/api",
});

export const getUsers = () => {
  return dataApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getCategories = () => {
  return dataApi.get(`/categories`).then(({ data }) => {
    return data.categories;
  });
};

export const getReviews = (category, sortBy = "date", orderDesc = true) => {
  return dataApi
    .get("/reviews", {
      params: { category, sortBy, order: orderDesc ? "asc" : "desc" },
    })
    .then(({ data }) => {
      return data.reviews;
    });
};
export const getReviewById = (id) => {
  return dataApi.get(`/reviews/${id}`).then(({ data }) => {
    return data.review;
  });
};
export const patchReviewVotesById = (id, inc) => {
  return dataApi
    .patch(`/reviews/${id}`, { inc_votes: inc })
    .then(({ data }) => {
      return data.review;
    });
};

export const getCommentsById = (id) => {
  return dataApi.get(`/reviews/${id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
export const deleteCommentById = (id) => {
  return dataApi.delete(`/comments/${id}`);
};
export const postCommentById = (id, body, username) => {
  return dataApi
    .post(`/reviews/${id}/comments`, { body: body, username: username })
    .then(({ data }) => {
      return data;
    });
};
