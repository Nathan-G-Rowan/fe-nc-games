import { getUsers } from "../utils/api";

export const User = ({ user, setUser }) => {
  return (
    <div>
      <div className="flexLine">
        <img className="profilePicture" src={user.avatar_url} />
        <div>
          <h1>{user.name}</h1>
          <h3>{user.username}</h3>
        </div>
      </div>

      <label htmlFor="sort-dropdown">Sorting by</label>

    </div>
  );
};
