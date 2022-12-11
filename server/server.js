const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { Info } = require('./db/models');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'sid_socket',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
}));

app.post('/new-info', async (req, res) => {
  try {
    const { info } = req.body;
    req.session.info = info;
    await Info.create({ session_id: req.sessionID, text: info });
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
})

io.on('connection', (socket) => {
  console.log('Websocket connected');
  console.log(socket.id);
  socket.on('update', (info) => {
    console.log(info);
    socket.local.emit('from server', info);
  });
});

server.listen(PORT, () => console.log(`Happy to see you, my Lord, on port ${PORT}`));
