const mongoose = require('mongoose');
const app = require('./app');
const { MONGODB_URI } = require('./utils/config');
require('dotenv').config();
console.log(`Connecting to MongoDB...`);
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // after connecting to MongoDB, start the server
        const PORT = process.env.PORT
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB', error);
    });