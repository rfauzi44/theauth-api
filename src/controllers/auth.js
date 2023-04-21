const models = require("../models/auth");
const response = require("../helpers/response");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const valid = require("../helpers/controllerValidation");
const auth = {};

auth.register = async (req, res) => {
  try {
    const { error, value } = valid.register.validate(req.body);
    if (error) {
      return response(res, 400, `${error.details[0].message}`);
    }
    const { name, email, gender, password } = value;

    const checkEmail = await models.login(email);
    if (checkEmail[0]) {
      return response(res, 400, "email has been registered");
    }
    const id = crypto.randomUUID();
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    userRegister = await models.register(id, name, email, gender, hash);
    const user = userRegister[0];
    delete user.password;
    const token = `Bearer ${jwt.sign(user, process.env.JWT_SECRETS, {
      expiresIn: "24h",
    })}`;
    const data = {
      token,
      user,
    };

    return response(res, 200, data);
  } catch (error) {
    return response(res, 500, error);
  }
};

auth.login = async (req, res) => {
  try {
    const { error, value } = valid.login.validate(req.body);
    if (error) {
      return response(res, 400, `${error.details[0].message}`);
    }
    const { email, password } = value;
    const result = await models.login(email);
    const user = result[0];
    if (!user) {
      return response(res, 401, "email not registered");
    }
    const compared = bcrypt.compareSync(password, user.password);
    if (!compared) {
      return response(res, 401, "wrong password");
    }
    delete user.password;
    const token = `Bearer ${jwt.sign(user, process.env.JWT_SECRETS, {
      expiresIn: "24h",
    })}`;
    const data = {
      token,
      user,
    };
    return response(res, 200, data);
  } catch (error) {
    return response(res, 500, error);
  }
};

auth.me = async (req, res) => {
  try {
    const activeuser = req.userData.id;
    const result = await models.getMe(activeuser);
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error);
  }
};

module.exports = auth;
