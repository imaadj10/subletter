const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const listingsRouter = require('./routes/listings');
const schoolsRouter = require('./routes/schools');
const housingRouter = require('./routes/housing');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/register', registerRouter);
app.use('/listings', listingsRouter);
app.use('/images', express.static('./public/images'));
app.use('/images', express.static('./images'));
app.use('/schools', schoolsRouter);
app.use('/housinginfo', housingRouter);

const port = 1234;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
