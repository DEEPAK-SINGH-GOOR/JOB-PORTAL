require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnector = require('./config/db');
const jobportalsupportRoute = require('./router/jobportalsupport.route');

const port = process.env.PORT || 3040; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

//-> jobportalsupportRoute
app.use("/",jobportalsupportRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  dbConnector();
});
