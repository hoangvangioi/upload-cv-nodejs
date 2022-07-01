const uploadFile = require("../middleware/upload");
require("dotenv").config();
const firebase = require('../firebase/firebase');
const { v4: uuid_v4 } = require('uuid');
const uuid = uuid_v4();

const upload = async (req, res) => {
  try {
    // Xóa tệp
    await firebase.bucket.deleteFiles({
       prefix: `uploads/`
    }).then(() => {
      console.log(`Tệp đã xóa thành công `);
    }).catch((error) => {
      console.log(`Uh-oh, một lỗi đã xảy ra! ${error}`);
    });

    await uploadFile(req, res);

    if (!req.file) {
      res.status(400).send(`Error, could not upload file ${err}`);
      return;
    }
    // Tạo blob mới trong nhóm tham chiếu tệp
    const blob = firebase.bucket.file(`uploads/${req.file.originalname}`);
    // Tạo luồng có thể ghi và chỉ định tệp Mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        cacheControl: "max-age=31536000",
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid, // Tạo token cho file tải lên
        },
      },
    });

    blobWriter.on('error', (err) => next(err));
    blobWriter.on('finish', async () => {
      // lắp ráp URL công khai để truy cập tệp qua HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${uuid}`;
      // Trả lại tên tệp và URL công khai của nó

      res.status(200).send({ Files : publicUrl });
    });

    // Khi không có thêm dữ liệu để tiêu thụ từ luồng
    blobWriter.end(req.file.buffer);

  } catch (error) {
    res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }
};

module.exports = { upload };
