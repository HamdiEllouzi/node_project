import "./App.css";
import SignInSide from "./component/login-componet";
import SignUp from "./component/sign-up";
import { useEffect, useState } from "react";
import Home from "./component/home";
import { useRoutes } from "react-router-dom";
import { RequireAuth, NotAuth } from "./service/private-route";
import { storeUpdate } from "./service/service";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("User"));
    if (currentUser) {
      storeUpdate();
    }
    setLoading(false);
  }, []);

  let element = useRoutes([
    {
      path: "/*",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/Sign-in",
      element: (
        <NotAuth>
          <SignInSide />
        </NotAuth>
      ),
    },
    {
      path: "/Sing-up",
      element: (
        <NotAuth>
          <SignUp />{" "}
        </NotAuth>
      ),
    },
  ]);

  return loading ? (
    <div className='loader-container'>
      <div className='loader'></div>
    </div>
  ) : (
    element
  );
}

export default App;
