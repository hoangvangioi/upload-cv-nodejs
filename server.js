const express = require('express');
const cors = require('cors');
const app = express();
const hostname = process.env.HOSTNAME
const port = process.env.PORT || 8000;
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

app.listen(port, () => {
  console.log(`Server is running on ${hostname}:${port} .......`);
});