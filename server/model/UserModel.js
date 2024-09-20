const db = require("../DbConnector");



async function getUserByEmail(email) {
  let results = await db.queryAsync(
    `
    SELECT * FROM users WHERE email = ? LIMIT 1;
    `, [email]
  )

  return results
}

async function insertUser(formData) {
  let result = await db.queryAsync(
    `
      INSERT INTO users (email, password)
      VALUES (? , ?)
    `, [formData.email, formData.password]
  )

  return result;
}
async function getAll() {
  const rows = await db.queryAsync(
    `
    SELECT * FROM users;
    `, []
  );

  return { users: rows };
}

async function checkLoginDetails(email, password) {
  const resp = await db.queryAsync(
    `
    SELECT * FROM users
    WHERE email = '${email}'
    AND password = '${password}'
    `
  );

  if (resp && resp.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function updatePasswordByEmail(userEmail, newPassword) {
  await db.queryAsync(
      `UPDATE users SET password = ? WHERE email = ?`,
      [newPassword, userEmail]
  );
}

module.exports = {
  getAll,
  checkLoginDetails,
  insertUser,
  getUserByEmail,
  updatePasswordByEmail
};
