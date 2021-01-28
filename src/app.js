'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');

const usersRouter = require('./users/user-router');
const authRouter = require('./auth/auth-router');
const barberRouter = require('./barbers/barber-router');
const serviceRouter = require('./BarberServices/barberService-router');
const appointmentRouter = require('./Appoinments/Appointment-router');
const app = express();

app.use(morgan((NODE_ENV === 'production')
  ? 'tiny'
  : 'common', {
  skip: () => NODE_ENV === 'test',
}));
app.use(cors());
app.use(helmet());

app.use('/vinyl/user',usersRouter);
app.use('/vinyl/auth',authRouter);
app.use('/vinyl/barber',barberRouter);
app.use('/vinyl/services',serviceRouter);
app.use('/vinyl/appointment',appointmentRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;