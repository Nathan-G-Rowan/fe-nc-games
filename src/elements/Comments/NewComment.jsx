import { useEffect, useState } from "react";
import { postCommentById } from "../../utils/api";
import { useParams } from "react-router-dom";

export const NewComment = ({ username, setComments }) => {
  const { id } = useParams();

  const [postingComment, setPostingComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    setPostingComment(false);
    setNewCommentText("");
  }, []);

  const submitComment = (event) => {
    event.preventDefault();

    if (newCommentText) {
      setPostingComment(true);

      postCommentById(id, newCommentText, username)
        .then(({ comment: resComment }) => {
          setComments((currentComments) => [...currentComments, resComment]);

          setNewCommentText("");
          setPostingComment(false);
        })
        .catch((error) => {
          setPostingComment(false);
        });
    }
  };

  return (
    <section>
      <h3>Comment:</h3>
      <form>
        <textarea
          name="comments"
          id="comments"
          placeholder="Write your comment ..."
          value={newCommentText}
          onChange={(event) => {
            setNewCommentText(event.target.value);
          }}
        />

        <button disabled={postingComment} onClick={submitComment}>
          {postingComment ? "Posting Comment..." : "Submit Comment"}
        </button>
      </form>
    </section>
  );
};
