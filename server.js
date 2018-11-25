const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const Promise = require("bluebird");

global.Promise = Promise;

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

// const config = require('./server/config/config');
// const database = require('./server/config/database');

const session = require('express-session');
const passport = require('passport');

// Get our API routes
const api = require('./server/routes/api');

// Tell passport how to write a user
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// Tell passport how to read a user
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json({limit: '50gb'}));
// app.use(bodyParser.urlencoded({limit: '50gb', extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');
err.status = 404;
next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
res.send(err.message);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
console.log('PORT: ', process.env.PORT);

app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));





/* Mongo DB Related */
// require('./server/config/passport')(passport);

// Set up a mlab account to use for mongodb. Connect to that db.
// mongoose.connect('mongodb://admin:admin@ds115446.mlab.com:15446/vista'); // Connect to MongoDB database for polling app.


/*
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, config.mongoConf);

const MongoStore = require('connect-mongo')(session);

// Make sure mongod is running! If not, log an error and exit.
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// Must set up a session to use for logging in
app.use(session({
  secret: 'my_precious_l@3',
  cookie: { maxAge: 18000000 }, // Session set to 5 hours, enough for a round of golf
  saveUninitialized: false, // don't create session until something stored
  resave: true, //don't save session if unmodified
  rolling: true,
  name: 'vt-session',
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
*/
