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
  optionsSuccessStatus: 200,
  allowedHeaders: 'Origin, Content-Type, X-Auth-Token',
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.set({
      "Access-Control-Allow-Origin": "https://password-reset-fe-flow.netlify.app",
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    });
    
    if (req.method === 'OPTIONS') {
      res.set({
        "Access-Control-Allow-Credentials": "true"
      });
      return res.status(204).send(); // respond to preflight requests
    }
  
    next();
  });
// Log requests
app.use(morgan('dev'));

// Parse the cookies of the request
app.use(cookieParser());

// Parse the body of the request
app.use(express.json());

// Define routes
app.use('/users', userRouter);

module.exports = app;
