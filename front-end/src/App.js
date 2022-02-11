import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Headers from "./components/headers/Header";
import MainPages from "./components/mainpages/pages";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/userActions";

import axios from "axios";
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token");
        console.log(res.data);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };

      getToken();
    }
  }, [auth.isLoggedIn, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Headers />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
