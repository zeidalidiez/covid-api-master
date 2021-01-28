'use strict';
const express = require('express');
const BarberService = require('./barber-service');
const { requireAuth } = require('../middleware/jwt-auth');
const barberRouter = express.Router();

barberRouter
  .route('/')
  .get((req, res, next) => {
    BarberService.getAllBarbers(req.app.get('db'))
      .then(barbers => {
        res.json(barbers);
      })
      .catch(next);
  });
barberRouter 
  .route('/:barber_id')
  .all(requireAuth)
  .get((req,res)=>{
    BarberService.getById(req.app.get('db'),req.params.barber_id)
      .then(barber => {
        res.json(barber);
      });

  });

module.exports = barberRouter;