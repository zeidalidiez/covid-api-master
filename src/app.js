/* eslint-disable no-unused-vars */
'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');

const usersRouter = require('./users/userRouter');
const authRouter = require('./auth/auth-router');
const walkerRouter = require('./walkers/walkerRouter');
const serviceRouter = require('./walkerServices/walkerService-router');
const appointmentRouter = require('./Appointments/Appointment-router');
const app = express();

app.use(morgan((NODE_ENV === 'production')
  ? 'tiny'
  : 'common', {
  skip: () => NODE_ENV === 'test',
}));
app.use(cors());
app.use(helmet());

app.use('/covidapi/user',usersRouter);
app.use('/covidapi/auth',authRouter);
app.use('/covidapi/walker',walkerRouter);
app.use('/covidapi/services',serviceRouter);
app.use('/covidapi/appointment',appointmentRouter);

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