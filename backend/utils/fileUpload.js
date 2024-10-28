const multer = require("multer");

const storage = multer.diskStorage({
  // filename: function (req, file, cb) {
  //   const timestamp = new Date().toISOString();
  //   cb(null, timestamp + "-" + file.originalname);
  // },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "application/pdf" ||
//     file.mimetype === "application/docx" ||
//     file.mimetype === "video/mp4"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Unsupported file type"), false);
//   }
// };

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
});

module.exports = upload;
