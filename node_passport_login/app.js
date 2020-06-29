const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//connect to Mongo
mongoose.connect(db,{useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//ejs
app.use(expressLayouts);
app.set('view engine','ejs');

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000; /* deploying on port 5000 */

app.listen(PORT, console.log(`Server started on port ${PORT}`));