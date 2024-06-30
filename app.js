const express = require('express');
const userRouter = require('./routes/userRoutes');
// const companyRouter = require('./routes/companyRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// enable CORS
const corsOptions = {
    origin: 'https://password-reset-fe-flow.netlify.app/', // Change this to the correct origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to send cookies
    optionsSuccessStatus: 204
  };
  
  app.use(cors(corsOptions));
  

// log requests
app.use(morgan('dev'));

// parse the cookies of the request
app.use(cookieParser());

// to parse the body of the request
app.use(express.json());

app.use('/users', userRouter);


module.exports = app;