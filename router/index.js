const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const serverless = require('serverless-http')

const routes = (app) => {
  router.get('/', (req, res) => { // route hiển thị form upload file
    res.sendFile(`${__dirname}/public/index.html`);
  })  
  router.post('/upload', controller.upload, (req, res, next) => {
    res.sendFile(__dirname + `/uploads/${req.file.filename}`); // nhận dữ liệu từ form và lưu file vào thư mục uploads
  })
  router.get("*", (req, res) => {
    res.send(`${req.err, res.err}`);
  });
  app.use(router);
};

module.exports = routes;
module.exports.handler = serverless(routes)