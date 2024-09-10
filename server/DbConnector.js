const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./main.db");

async function queryAsync(query, params) {

  return new Promise((resolve, reject) => {
    db.all(query,params, (err, rows) => {
      resolve(rows);
      reject(err);
    });

  });
}

module.exports = {
    queryAsync
}



