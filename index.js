const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const moment = require('moment');
const mongojs = require('mongojs');

const fetch = require('node-fetch')

const app = express()
require('dotenv').config();
require('./config/passport')(passport);


const config = require('./config/database')

// DATABASE CONNECT

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Database is Connected.')
})
db.once('error', (err) => {
    console.log(err)
})

// EXPRESS JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    limit: '50mb',
    parameterLimit: 100000, extended: true
}))
app.use(compression());

// VIEWS - JADE
app.set('view engine', 'jade');
app.set('/views', './views');

// STATIC FILES
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('pandora'));

// CONNECT FLASH
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// SESSION
const store = new MongoDBStore({
    uri: config.database,
    collection: 'sessions'
});

app.use(session({
    secret: 'Pandora Prints',
    resave: true,
    saveUninitialized: true,
    store: store
}));


// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
const web = require('./routes/web')
const admin = require('./routes/admin')
const auth = require('./routes/auth')

app.use('/',web)
app.use('/admin',admin)
app.use('/auth',auth)



app.use(function (req, res, next) {
    res.render('./error_pages/404.jade', {
        error: '404'
    });
});

app.listen(process.env.PORT, (err) => {
  
    console.log('app running in port ' + process.env.PORT)
   
})

