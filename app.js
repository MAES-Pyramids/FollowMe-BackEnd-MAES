const morgan = require('morgan');
const express = require('express');

const studentsRouter = require('./routes/studentsRoutes');
//-------------------------------------------//
const app = express();
//---------------middleware------------------//
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.time = new Date().toISOString();
  next();
});

app.use(express.static('public'));

app.use('/api/v1/students', studentsRouter);
//-------------------------------------------//
module.exports = app;
