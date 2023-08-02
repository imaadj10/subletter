const createError = require('http-errors');
const express = require('express');
const path = require('path');
const http = require('http')
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require("./mysql/mysql");

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const listingsRouter = require('./routes/listings');
const schoolsRouter = require('./routes/schools');
const housingRouter = require('./routes/housing');
const commentsRouter = require('./routes/comments');
const addressRouter = require('./routes/addresses');
const messagesRouter = require('./routes/messages');

const app = express();
app.use(cors());

const server = http.Server(app);

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
app.use('/images', express.static('./images'));
app.use('/schools', schoolsRouter);
app.use('/housinginfo', housingRouter);
app.use('/comments', commentsRouter);
app.use('/addresses', addressRouter);
app.use('/messages', messagesRouter);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle when a new message is sent
  socket.on('new_message', async (message) => {
    try {
      // Save the message to the database
      const query = `INSERT INTO messages(sid, rid, content) VALUES ('${message.sid}', '${message.rid}', '${message.content}')`;
      await db.query(query);

      // Broadcast the new message to relevant clients
      io.emit('new_message', message);
    } catch (error) {
      console.log('Error saving message to the database:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 1234;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = io;