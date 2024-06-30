const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
require('dotenv').config();

const userController = {
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Password Reset',
        text: `Please click on the following link to reset your password:\n\n
          http://localhost:5173/reset-password/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          console.error('Error sending email:', err);
          return res.status(500).send('Error sending email');
        }
        res.status(200).send('Password reset link sent');
      });
    } catch (error) {
      console.error('Error in forgot password:', error);
      res.status(500).send('Error in forgot password');
    }
  },

  getResetPassword: async (req, res) => {
    const { token } = req.params;
    try {
      const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired');
      }
      res.status(200).send('Password reset token is valid');
    } catch (error) {
      console.error('Error in get reset password:', error);
      res.status(500).send('Error in get reset password');
    }
  },

  postResetPassword: async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token, password);
    try {
      const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired');
      }
      user.password = password;
      //password hashing 
      user.password = await bcrypt.hash(user.password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      res.status(200).send('Password reset successful');
      setTimeout(() => {
          res.redirect('/login');
      },1000)
    } catch (error) {
      console.error('Error in post reset password:', error);
      res.status(500).send('Error in post reset password');
    }
  },
  register: async (request, response) => {
    try {
        const {name, email, password} = new User(request.body);
        // check user is already register or not
        const isUserExist = await User.findOne({ email });

        
        // if user already exist then return error response
        if (isUserExist) {
            return response.status(400).send({ message: 'User already exist'});
        }
        
        //password hashing 
        const hashPassword = await bcrypt.hash(password, 10);

        // console.log({email});
        // create new user
        const newUser = new User({name,email,password: hashPassword });

        // save the user
        const savedUser =  await newUser.save();

        response.status(201).send({message: 'User created successfully',
            newUser:savedUser
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
},
  login: async (request, response) => {
    try {
        
        // get the user email and password from the request body
        const { email, password } = request.body;


        // check if the user exists in the database
        const user = await User.findOne({ email });

        
        // if the user does not exist, return an error response
        if (!user) {
            return response.status(404).send({ message: 'User not found' });
        }

        // if the user exists, compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // if the password is invalid, return an error response
        if(!isPasswordValid) {
            return response.status(400).send({ message: 'Invalid password' });
        }

        // generate a JWT token
        const token = jwt.sign({ id: user._id }, SECRET_KEY);
        // console.log(token);
        // set a cookie with the token
        response.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 24 * 3600000) // 24 hours from login
        });
        

        response.status(200).send({ message: 'Login successful' });
        
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
},
};

module.exports = userController;
