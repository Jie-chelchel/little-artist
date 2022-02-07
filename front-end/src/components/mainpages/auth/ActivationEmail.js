import React, { useEffect, useState } from "react";
import { showErrMsg, showSuccessMsg } from "../utils/notification/Notification";
import axios from "axios";
import { useParams } from "react-router-dom";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8000/user/activation",
            { activation_token }
          );
          console.log(res.data);
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="active_page">
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
}

export default ActivationEmail;
