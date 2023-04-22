const morgan = require('morgan');
const express = require('express');

const DoctorsRouter = require('./routes/DoctorsRoutes');
const StudentsRouter = require('./routes/StudentsRoutes');
const ProposalRouter = require('./routes/ProposalRoutes');
//-------------------------------------------//
const app = express();
//---------------middleware------------------//
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/api/v1/proposal', ProposalRouter);
app.use('/api/v1/students', StudentsRouter);
app.use('/api/v1/doctors', DoctorsRouter);
//-------------------------------------------//
module.exports = app;
