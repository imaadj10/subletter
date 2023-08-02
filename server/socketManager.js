const { Server } = require('socket.io');
const db = require("./mysql/mysql");

let io;

const initSocketIO = (server) => {
  io = new Server(server, {
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
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized.');
  }
  return io;
};

module.exports = {
  initSocketIO,
  getIO,
};