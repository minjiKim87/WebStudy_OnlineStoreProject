const multer = require("multer");
const uuid = require("uuid").v4;

const upload = mutler({
  storage: multer.diskStorage({
    destination: "product-data/images",
    filename: function (req, file, cb) {
      cb(null, uuid() + "-" + file.originalname);
    },
  }),
});

const configuredMulterMiddleware = upoload.single("image");

module.exports = configuredMulterMiddleware;
