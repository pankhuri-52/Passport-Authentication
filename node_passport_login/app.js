const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//Passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db,{useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//ejs
app.use(expressLayouts);
app.set('view engine','ejs');

//body-parser (earlier we have to install it separately, now it is a part of express itself)
app.use(express.urlencoded({ extended : false }));

//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000; /* deploying on port 5000 */

app.listen(PORT, console.log(`Server started on port ${PORT}`));