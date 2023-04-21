const models = require("../models/product");
const response = require("../helpers/response");
const crypto = require("crypto");
const { imageFolder } = require("../middlewares/uploadImage");
const valid = require("../helpers/controllerValidation");
ctrl = {};

ctrl.addProduct = async (req, res) => {
  try {
    const { error, value } = valid.product.validate(req.body);
    if (error) {
      return response(res, 400, `${error.details[0].message}`);
    }
    const { name, description, price } = value;
    const user_id = req.userData.id;
    const image = req.file ? req.file.filename : "default-image.jpg";
    const id = crypto.randomUUID();

    const result = await models.addProduct(
      { id, name, description, price, user_id },
      image
    );
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error);
  }
};

ctrl.getProductAll = async (req, res) => {
  try {
    const result = await models.getProductAll();
    const imagePath =
      process.env.APP_URL +
      ":" +
      process.env.APP_PORT +
      "/" +
      imageFolder +
      "/";

    for (let index = 0; index < result.length; index++) {
      result[index].image = imagePath + result[index].image;
    }

    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error);
  }
};

ctrl.getProductID = async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await models.getProductID(product_id);
    const imagePath =
      process.env.APP_URL +
      ":" +
      process.env.APP_PORT +
      "/" +
      imageFolder +
      "/";
    result[0].image = imagePath + result[0].image;
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error);
  }
};

ctrl.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { error, value } = valid.product.validate(req.body);
    if (error) {
      return response(res, 400, `${error.details[0].message}`);
    }
    const { name, description, price } = value;

    const product = await models.getProductID(product_id);

    let image;
    if (req.file) {
      image = req.file.filename;
    } else {
      image = product[0].image;
    }

    const result = await models.updateProduct(
      product_id,
      {
        name,
        description,
        price,
      },
      image
    );

    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error);
  }
};

ctrl.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await models.deleteProduct(product_id);
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error);
  }
};

module.exports = ctrl;
