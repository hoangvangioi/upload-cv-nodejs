const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()

const corsOptions = {
    origin: [process.env.ORIGIN],
}
  
global.__basedir = __dirname;

app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use(cors(corsOptions));

const initRoutes = require("./router");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
  
module.exports = app;
