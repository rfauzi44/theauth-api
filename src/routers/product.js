const express = require("express");
const routers = express.Router();
const ctrl = require("../controllers/product");
const { upload } = require("../middlewares/uploadImage");
const auth = require("../middlewares/auth");

routers.post("/", auth.login, upload.file, ctrl.addProduct);
routers.get("/", auth.login, ctrl.getProductAll);
routers.get("/:product_id", auth.login, ctrl.getProductID);
routers.put("/:product_id", auth.login, upload.file, ctrl.updateProduct);
routers.delete("/:product_id", auth.login, ctrl.deleteProduct);

module.exports = routers;
