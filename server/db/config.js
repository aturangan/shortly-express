const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create links table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS links (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      url VARCHAR(255),
      baseUrl VARCHAR(255),
      code VARCHAR(5),
      title VARCHAR(255),
      visits INT NOT NULL DEFAULT 0,
      timestamp TIMESTAMP
    );`)
    .then(() => {
      // Create clicks table
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS clicks (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          linkId INT,
          timestamp TIMESTAMP
        );`);
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS users (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(20),
          password VARCHAR(40),
          timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(username)
        );`);
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS sessions (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          hash VARCHAR(40),
          user_id VARCHAR(40),
          timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`);
    })
  /************************************************************/
  /*          Add additional schema queries here              */
  /************************************************************/

    .error(err => {
      console.log(err);
    });
};
