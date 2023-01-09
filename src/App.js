import "./App.css";

import { getUsers } from "./utils/api";
import { useEffect, useState } from "react";
import { Reviews } from "./elements/Reviews";
import { Link, useLocation, Routes, Route } from "react-router-dom";

function App() {
  const url = useLocation();
  const [user, setUser] = useState(undefined);
  

  useEffect(() => {
    getUsers().then((users) => {
      if (users.length !== 0) setUser(users[0]);
    });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Table of Tops</h1>
      </header>
      <nav>
        {user ? user.name : "Loading User"}
        <Link to="/">
          <button disabled={url.pathname === "/"}>Reviews</button>
        </Link>
        <Link to="/user">
          <button disabled={url.pathname === "/user"}>User</button>
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="*" element={<Reviews />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
