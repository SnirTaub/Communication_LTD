import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useContext, useState } from "react";
import Axios from "axios";
import { validateByConfig } from "../helpers";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const SUCCESS = "success";

const IMG_URL = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTIzM21scjE2c2hsaXRmampneDFmdDJzMHV1cTJjMTBoMml0YzNzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rXo87mS3dSDthLYr6Q/giphy.gifhttps://media.giphy.com/media/DHeDr3SAM08koK2GFT/giphy.gif";

const REGISTER_API = "http://localhost:3000/register";

const RegisterPanel = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");

  const userContextData = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const onRegister = async () => {
    let validationObject = validateByConfig(formData);
    setValidationError(validationObject.errorMsg);

    if (validationObject.isValid) {
      Axios.post(REGISTER_API, formData).then((r) => {
        if (r.data.status === SUCCESS) {
          userContextData.setLoggedInStatus(true);
          userContextData.setUserEmail(formData.email);
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="register-panel">
      <div className="register-form">
        <h1 className="register-title">Register</h1>
        <h2 className="validation-error">{validationError}</h2>

        <div className="form">
          <InputField
            fieldName="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {/* <InputField
            fieldName="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          /> */}
          <InputField
            fieldName="Password"
            hide
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <InputField
            hide
            fieldName="Repeat password"
            onChange={(e) =>
              setFormData({ ...formData, repeatPassword: e.target.value })
            }
          />

          <SubmitButton onClick={onRegister} />
        </div>
      </div>
      <div>
        <img className="register-pic" src={IMG_URL} alt="" />
      </div>
    </div>
  );
};

export default RegisterPanel;
