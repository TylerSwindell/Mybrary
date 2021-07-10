if (process.env.NODE_ENV !== 'production') require('dotenv').config(); // video says .parse(), but that is depricated.

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.on('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => (process.env.PORT) ? console.log(`Server Started:${process.env.PORT}`) : console.log(`Server Started:3000`));