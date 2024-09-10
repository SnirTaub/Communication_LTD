import { useContext, useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Axios from "axios";
import * as Config from "../config.json";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";


const config = Config.default;

const IMG_URL = "https://media.giphy.com/media/loXfQtPqLxGmbLs9h2/giphy.gif";

const LoginPanel = () => {

  const userDataContext = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("_");
  const [tries, setTries] = useState(0);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("_");
  const [loggedIn, setLoggedIn] = useState(false);

  async function checkCredentialsInServer(e) {
    if (tries > config.loginRetriesPossible) {
      alert("maximum login attemptes made, try again later...");
    }

    setTries((old) => old + 1);

    const isValid = await Axios.get(
      `http://localhost:3000/users/${email}/${password}`
    );
    setLoggedIn(isValid.data);

    if (isValid.data) {
      setError(false);
      userDataContext.setLoggedInStatus(true);
      userDataContext.setUserEmail(email);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setError(true);
    }
  }

  return (
    <div className="register-panel">
      {loggedIn ? <h1 className="register-title">USER LOGGED IN</h1> : ""}
      {error ? <h1 className="register-title">Wrong Credentials!!</h1> : null}
      <div className="register-form">
        <h1 className="register-title">Login</h1>

        <form onSubmit={(e) => e.preventDefault()} className="form">
          <InputField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fieldName="Email"
          />

          <InputField
            hide={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fieldName="Password"
          />

          <SubmitButton
            onClick={() => {
              console.log("SENDING TO SERVER", { email, password });
              checkCredentialsInServer();
            }}
          />
        </form>
      </div>
      <div>
        <img className="register-pic" src={IMG_URL} alt="" />
      </div>
    </div>
  );
};

export default LoginPanel;
