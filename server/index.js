require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const dbConnector = require('./config/db');
const jobportalsupportRoute = require('./router/jobportalsupport.route');
const intaialization = require('./services/passportservice');

const port = process.env.PORT || 3040; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
   secret: process.env.SESSION_KEY,    
   resave: false,               
   saveUninitialized: true,    
   cookie: { 
    secure: process.env.NODE_ENV === 'development',  
    httpOnly: true,  
    sameSite: 'strict', 
  }  
}))

intaialization(passport);

app.use(passport.session());
app.use(passport.initialize());

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

//-> jobportalsupportRoute
app.use("/",jobportalsupportRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  dbConnector();
});
