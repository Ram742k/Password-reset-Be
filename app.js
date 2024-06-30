const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

// Enable CORS with specific origin
const corsOptions = {
  origin: 'https://eclectic-strudel-2ca918.netlify.app/', // Change this to the correct origin without trailing slash
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you need to send cookies
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Log requests
app.use(morgan('dev'));

// Parse the cookies of the request
app.use(cookieParser());

// Parse the body of the request
app.use(express.json());

// Define routes
app.use('/users', userRouter);

module.exports = app;
