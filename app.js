const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
// const companyRouter = require('./routes/companyRoutes');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');



const app = express();


// enable CORS
// const corsOptions = {
//     origin: 'https://password-reset-fe-flow.netlify.app/', // Change this to the correct origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // if you need to send cookies
//     optionsSuccessStatus: 200
//   };
  
  app.use(cors());
  

// log requests
app.use(morgan('dev'));

// parse the cookies of the request
app.use(cookieParser());

// to parse the body of the request
app.use(express.json());

app.use('/users', userRouter);


module.exports = app;