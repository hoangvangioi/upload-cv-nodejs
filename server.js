const app = require('./app')
require('dotenv').config()
const port = process.env.PORT || 8000;
const hostname = process.env.HOSTNAME

app.listen(port, () => {
  console.log(`Server is running on ${hostname}:${port} .......`);
});