'use strict';
const express = require('express');
const path = require('path');
const AppointmentService = require('../Appointments/Appointment-services');
const { requireAuth } = require('../middleware/jwt-auth');


const AppointmentRouter = express.Router();
const jsonBodyParser = express.json();

AppointmentRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    AppointmentService.getAppointments(req.app.get('db'), req.user.id)
      .then(Appointments => {
        res.json(Appointments);
      })
      .catch(next);
  });

AppointmentRouter
  .route('/:Appointment_id')
  .all(requireAuth)
  .get((req, res) => {
    AppointmentService.getById(req.app.get('db'), req.params.Appointment_id)
      .then(Appointment => {
        res.json(Appointment);
      });

  })
  .delete((req, res, next) => {
    const { Appointment_id } = req.params;
    AppointmentService.deleteAppointment(
      req.app.get('db'),
      Appointment_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });
AppointmentRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {  time, services_id, walker_id } = req.body;

    const newAppointment = {  time, services_id, walker_id };

    if (!time && !services_id) {
      return res.status(400).json({
        error: 'Please select both a Service and a Time'
      });
    }
    if (!time) {
      return res.status(400).json({
        error: 'Please select a time'
      });
    }
    if (!services_id) {

      return res.status(400).json({
        error: 'Please select a service '
      });
    }

    newAppointment.users_id = req.user.id;

    AppointmentService.insertAppointment(
      req.app.get('db'),
      newAppointment
    )
      .then(appointment => {
        if (!appointment)
          return res.status(400).json({
            error: 'please select both service and appointment',
          });
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${appointment.id}`))
          .json(appointment);
      })
      .catch(next);
  });


module.exports = AppointmentRouter;