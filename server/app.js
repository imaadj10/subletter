const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const socketManager = require('./socketManager');

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const listingsRouter = require('./routes/listings');
const schoolsRouter = require('./routes/schools');
const housingRouter = require('./routes/housing');
const commentsRouter = require('./routes/comments');
const addressRouter = require('./routes/addresses');
const notificationRouter = require('./routes/notifications');
const messagesRouter = require('./routes/messages');
const unitsRouter = require('./routes/units');
const reviewsRouter = require('./routes/reviews');
const topHousingRouter = require('./routes/top_housing');

const app = express();
app.use(cors());

const server = http.createServer(app);

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
app.use('/register', registerRouter);
app.use('/listings', listingsRouter);
app.use('/images', express.static('./images'));
app.use('/schools', schoolsRouter);
app.use('/housinginfo', housingRouter);
app.use('/comments', commentsRouter);
app.use('/addresses', addressRouter);
app.use('/notifications', notificationRouter);
app.use('/messages', messagesRouter);
app.use('/units', unitsRouter);
app.use('/reviews', reviewsRouter);
app.use('/tophousing', topHousingRouter);

// Import the socket handler and initialize it with the server
socketManager.initSocketIO(server);

const port = 1234;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
