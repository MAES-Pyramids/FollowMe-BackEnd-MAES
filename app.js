const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const DoctorsRouter = require('./routes/DoctorsRoutes');
const StudentsRouter = require('./routes/StudentsRoutes');
const ProposalRouter = require('./routes/ProposalRoutes');

const globalErrorHandler = require('./controllers/errorsController');
//-------------------------------------------//
const app = express();
//---------------middleware------------------//
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/proposal', ProposalRouter);
app.use('/api/v1/students', StudentsRouter);
app.use('/api/v1/doctors', DoctorsRouter);

//-------------------------------------------//
// Error Handling Middleware
app.use(globalErrorHandler);
//-------------------------------------------//
module.exports = app;
