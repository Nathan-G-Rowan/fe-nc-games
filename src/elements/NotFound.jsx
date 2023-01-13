import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="error">
      <p>Page doesn't Exist: </p>
      <button
        onClick={(e) => {
          navigate("/");
        }}
      >
        Return to Home
      </button>
    </div>
  );
};
