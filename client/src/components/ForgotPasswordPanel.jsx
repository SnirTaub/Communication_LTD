import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

const IMG_URL = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDVoaHYwNmt0dmhveXlyZXZweDNxMW5ueHh1cjIwcXhkODM4bGZ1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5QhWuxxILxPd0kWoL1/giphy.gif";

const ForgotPasswordPanel = () => {
  return (
      <div className="register-panel">
        <div className="register-form">
          <h1 className="register-title">Reset Password</h1>

          <div className="form">
            <InputField hide={true} fieldName="Current Password" />
            <InputField hide={true} fieldName="New Password" />
            <InputField hide={true} fieldName="Repeat New Password" />

            <SubmitButton />
          </div>
        </div>
        <div>
          <img className="register-pic" src={IMG_URL} alt="" />
        </div>
      </div>
  );
};

export default ForgotPasswordPanel;
