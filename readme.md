🔑 Password Reset Flow
======================

This project implements a password reset flow using Node.js, Express, MongoDB, and React.

📝 Description
--------------

This application allows users to register for an account, log in, and reset their passwords. Users can request a password reset link, which is sent to their email. The link directs them to a page where they can set a new password.

📖 Usage
--------

### 🔒 Forgot Password

1.  **Go to the forgot password page:** /forgot-password 📬
    
    *   This is the route where users can request a password reset link.
        
2.  **Enter your email address:** 📧
    
    *   Users need to provide the email address associated with their account.
        
3.  **Check your email for the password reset link:** 📩
    
    *   The system will send an email with a password reset link to the provided email address.
        
4.  **Click the link to go to the reset password page:** 🔗
    
    *   The link will direct users to a page where they can reset their password.
        

### 🔑 Reset Password

1.  **On the reset password page, enter your new password:** 🔐
    
    *   Users need to input their new password.
        
2.  **Confirm your new password:** ✔️
    
    *   Users need to re-enter their new password to confirm it.
        
3.  **Submit the form to reset your password:** 📨
    
    *   Upon submission, the new password will be saved, and the user will be notified of the successful reset.
        

### 🔓 Login

1.  **Go to the login page:** /login 🚪
    
    *   This is the route where users can log in to their account.
        
2.  **Enter your email address and password:** 📝
    
    *   Users need to provide their registered email address and password.
        
3.  **Click the login button:** 🔘
    
    *   Upon successful authentication, users will be redirected to the dashboard or home page.
        
4.  **If you forget your password, click the "Forgot Password" link:** 🔗
    
    *   This will take you to the forgot password page to start the reset process.
        

### 📝 Register

1.  **Go to the register page:** /register ✍️
    
    *   This is the route where new users can create an account.
        
2.  **Enter your details (name, email, password):** 📝
    
    *   Users need to provide their name, email address, and a password to create a new account.
        
3.  **Click the register button:** 🔘
    
    *   Upon successful registration, users will be redirected to the login page to log in with their new credentials.
        
