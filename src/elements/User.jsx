import { getUsers } from "../utils/api";
import { useEffect, useState } from "react";

export const User = ({ user, setUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((responseUsers) => {
      setUsers(responseUsers);
    });
  }, []);

  return (
    <div>
      <div className="flexLine">
        <img
          className="profilePicture"
          src={user.avatar_url}
          alt={user.username + "'s profile picture. They look great!"}
        />
        <div>
          <div className="card">
            <h2>{user.name}</h2>
            <h3>{user.username}</h3>
          </div>
          <div className="userOptions">
            <label htmlFor="user-dropdown">Switch User: </label>
            <div className="dropdown" id="user-dropdown">
              <button className="dropButton">{user.username} ▼</button>
              <div className="dropContent">
                {users.map((currentUser) => {
                  if (currentUser.username === user.username) return null;
                  return (
                    <button
                      key={currentUser.username}
                      onClick={(event) => {
                        setUser(currentUser);
                      }}
                    >
                      {currentUser.username}
                    </button>
                  );
                })}
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
