'use strict';
const express = require('express');
const BarberServiceTools = require('./barberService-tools');
const ServicesRouter = express.Router();

ServicesRouter
  .route('/')
  .get((req, res, next) => {
    BarberServiceTools.getAllServices(req.app.get('db'))
      .then(services => {
        res.json(services);
      })
      .catch(next);
  });

module.exports = ServicesRouter;