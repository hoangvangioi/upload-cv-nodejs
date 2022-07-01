const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8000;
const hostname = process.env.HOSTNAME

const corsOptions = {
  origin: [process.env.ORIGIN],
}

global.__basedir = __dirname;


app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use(cors(corsOptions));

const initRoutes = require("./src/router");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);


app.listen(port, () => {
  console.log(`Server is running on ${hostname}:${port} .......`);
});