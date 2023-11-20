const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, callBack) => {
    const originalNameWithoutExt = path.parse(file.originalname).name;

    const currentDate = new Date()
      .toISOString()
      .slice(0, 16)
      .replace(/[-T:]/g, "");

    const newFilename = `${originalNameWithoutExt}_${currentDate}${path.extname(
      file.originalname
    )}`;

    callBack(null, newFilename);
  },
});
const upload = multer({
  storage,
});

module.exports = upload;
