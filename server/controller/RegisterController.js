const { hashPassword, decodeHashedPassword, checkPassword } = require("../helpers");
const UserModel = require("../model/UserModel");

async function register(req, res) {
  let formData = req.body;

  let usersWithEmail = await UserModel.getUserByEmail(formData.email);

  if (usersWithEmail.length > 0) {
    res.status(301).send({ status: "user_exists_already" });
  } else {
    formData.password = hashPassword(formData.password);
    await UserModel.insertUser(formData);
    res.status(200).send({ status: "success" });
  }
}

async function getAllUsers(req, res) {
  const rows = await UserModel.getAll();

  res.send({ users: rows });
}

async function checkValidCredentials(req, res) {
  const users = await UserModel.getUserByEmail(req.params.email);
  let hashedPassword;
  let salt;
  let isLoginValid = false;

  if (users[0]) {
    hashedPassword = users[0].password;
    salt = hashedPassword.split(':')[1];
    isLoginValid =  checkPassword(req.params.password, salt, hashedPassword);
  }

  res.send(isLoginValid);
}

module.exports = {
  getAllUsers,
  checkValidCredentials,
  register,
};
