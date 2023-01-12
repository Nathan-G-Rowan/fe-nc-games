import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCommentsById } from "../../utils/api";

import { NewComment } from "./NewComment";
import { CommentCard } from "./CommentCard";
import { Loading } from "../Loading";

export const Comments = ({ username }) => {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    getCommentsById(id).then((responseComments) => {
      setCommentsLoaded(true);
      setComments(responseComments);
    });
  }, []);

  if (!commentsLoaded) {
    return (
      <section className="comments">
        <h3>Comments</h3>
        <Loading />
      </section>
    );
  }

  return (
    <section className="comments">
      <h3>
        {comments.length} {comments.length !== 1 ? "Comments" : "Comment"}:
      </h3>
      <ul>
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
        <NewComment username={username} setComments={setComments} />
      </ul>
    </section>
  );
};
