const db = require("../configs/db");
const models = {};

models.register = async (id, name, email, gender, password) => {
  try {
    const result = await db.query(
      `INSERT INTO Users (id, name, email, gender, password, created_at) VALUES($1, $2, $3, $4, $5, now()) RETURNING *`,
      [id, name, email, gender, password]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

models.login = async (email) => {
  try {
    result = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

models.getMe = async (activeuser) => {
  try {
    result = await db.query(
      `SELECT * FROM users
       WHERE id = $1
       `,
      [activeuser]
    );

    delete result.rows[0].password;
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = models;
