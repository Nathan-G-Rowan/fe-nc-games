import { patchReviewVotesById } from "../utils/api";
import { useState } from "react";

export const Vote = ({ body, localVotes, setLocalVotes }) => {
  const [processingVote, setProcessingVote] = useState(false);

  const vote = () => {
    if (!processingVote) setProcessingVote(true);
    const inc = localVotes > body.votes ? -1 : 1;
    patchReviewVotesById(body.review_id, inc)
      .then((res) => {
        setLocalVotes((currentVotes) => currentVotes + inc);
        setProcessingVote(false);
      })
      .catch((err) => {
        setProcessingVote(false);
      });
  };

  return (
    <div>
      {localVotes > 1 ? `${localVotes} votes` : `${localVotes}vote`}{" "}
      <button className="voteButton" disabled={processingVote} onClick={vote}>
        {localVotes > body.votes ? "undo▼" : "vote▲"}
      </button>
    </div>
  );
};
