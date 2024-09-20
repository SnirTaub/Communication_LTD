const express = require("express");
const app = express();
const cors = require('cors');
const RegisterController = require("./controller/RegisterController.js");
const ForgotPasswordController = require("./controller/ForgotPasswordController.js");

app.use(cors());

app.use(express.json());

app.get("/users", RegisterController.getAllUsers);

app.get("/users/:email/:password", RegisterController.checkValidCredentials);

app.post("/register" , RegisterController.register);

app.post("/forgot-password", ForgotPasswordController.forgotPassword);

app.post("/reset-password/:token", ForgotPasswordController.resetPassword);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
