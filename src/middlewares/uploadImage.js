const multer = require("multer");
const response = require("../helpers/response");
const upload = {};

const imageFolder = "image";
upload.file = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/" + imageFolder);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      if (ext !== "png" && ext !== "jpg" && ext !== "jpeg" && ext !== "webp") {
        cb(new Error("File not allowed"));
      } else {
        cb(null, `${Date.now()}.${ext}`);
      }
    },
  });
  const limits = { fileSize: 5 * 1024 * 1024 };
  const upload = multer({ storage, limits }).single("image");

  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      return response(res, 500, error.message);
    } else if (error) {
      return response(res, 500, error.message);
    } else {
      next();
    }
  });
};

module.exports = {
  upload,
  imageFolder,
};
