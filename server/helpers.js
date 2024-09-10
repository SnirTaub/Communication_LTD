const crypto = require("crypto");

function hashPassword(password) {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString("hex");

  // Hash the password using HMAC and the salt
  const hashed_password = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // Combine the hashed password and salt, separated by ':'
  return hashed_password + ":" + salt;
}

function checkPassword(password, salt, hashed_password) {
  const [hash, stored_salt] = hashed_password.split(":");

  // Hash the user-entered password using the stored salt
  const hashed_attempt = crypto
    .createHmac("sha256", stored_salt)
    .update(password)
    .digest("hex");

  // Compare the hashed attempt with the stored hash
  return hashed_attempt === hash;
}

module.exports = {
  hashPassword,
  checkPassword,
};
