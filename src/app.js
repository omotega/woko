const express = require('express');
const dotenv = require('dotenv').config();
require('express-async-errors');
const { errorHandler } = require('./middlewares/errorhandler');

const port = process.env.PORT || 5200;

const app = express();

const postrouter = require('./routes/postroute');
const userrouter = require('./routes/userroute');
const connectdb = require('./config/db');

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/posts', postrouter);
app.use('/api/v1/users', userrouter);

app.use(errorHandler);

app.listen(port, () => console.log(`db connected on port ${port}`));
