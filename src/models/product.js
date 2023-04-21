const db = require("../configs/db");
models = {};

models.addProduct = async (
  { id, name, description, price, user_id },
  image
) => {
  try {
    result = await db.query(
      `INSERT INTO products (id, name, description, price, user_id, image, created_at) VALUES($1, $2, $3, $4, $5, $6, now())`,
      [id, name, description, price, user_id, image]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

models.getProductAll = async () => {
  try {
    result = await db.query(
      `SELECT *
       FROM products
       ORDER BY created_at DESC`
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

models.getProductID = async (product_id) => {
  try {
    result = await db.query(
      `SELECT *
       FROM products
       WHERE id = $1
       `,
      [product_id]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

models.updateProduct = async (
  product_id,
  { name, description, price },
  image
) => {
  try {
    result = await db.query(
      `UPDATE products SET name = $1, description = $2, price = $3, image = $4, updated_at = now() WHERE id = $5`,
      [name, description, price, image, product_id]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

models.deleteProduct = async (product_id) => {
  try {
    result = await db.query(`DELETE FROM products WHERE id = $1`, [product_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = models;
