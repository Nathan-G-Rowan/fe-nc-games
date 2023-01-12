import "./App.css";

import { getUsers } from "./utils/api";
import { useEffect, useState } from "react";
import { Reviews } from "./elements/Reviews/Reviews";
import { SingleReview } from "./elements/SingleReview";

import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const navigate = useNavigate();

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
        <Link to={`/`}>
          <h1>Table of Tops</h1>
        </Link>
      </header>
      <nav>
        {user ? user.name : "Loading User"}
        <button
          disabled={
            url.pathname === "/" ||
            url.pathname.match(/\/category\/:category_slug/)
          }
          onClick={() => navigate("/")}
        >
          Reviews
        </button>
        <button
          disabled={url.pathname === "/user"}
          onClick={() => navigate("/user")}
        >
          User
        </button>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/category/:category_slug" element={<Reviews />} />
          {user ? (
            <Route
              path="/review/:id/*"
              element={<SingleReview username={user.username} />}
            />
          ) : null}
        </Routes>
      </main>
    </div>
  );
}

export default App;
