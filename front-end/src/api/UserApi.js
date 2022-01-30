import React, { useEffect, useState } from "react";
import axios from "axios";
function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:8000/user/infor", {
            headers: { Authorization: token },
          });
          console.log(res);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  return <div></div>;
}

export default UserAPI;
