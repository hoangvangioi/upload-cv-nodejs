const util = require("util");
const multer = require("multer");

// cấu hình lưu trữ file khi upload xong
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/uploads'); // files khi upload xong sẽ nằm trong thư mục "uploads" này
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // tạo tên file 
  }
})

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("fileUpload");
//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
