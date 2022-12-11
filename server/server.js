const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { Info } = require('./db/models');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
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

app.listen(PORT, () => console.log(`Happy to see you, my Lord, on port ${PORT}`));
