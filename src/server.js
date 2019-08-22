const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('./config/passport')(passport);

const PORT = 3000;
const dbConfig = require('./db');
const routes = require('./routes');

const server = express();
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

server.use(session({ secret: 'mysecretkey' }));
server.use(passport.initialize());
server.use(passport.session());
server.use(cors());
server.use(express.json());

server.use(routes);

server.listen(PORT, () => console.log(`Server running on port ${ PORT }.`));