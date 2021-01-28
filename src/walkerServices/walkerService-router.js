'use strict';
const express = require('express');
const walkerServiceTools = require('./walkerService-tools');
const ServicesRouter = express.Router();

ServicesRouter
  .route('/')
  .get((req, res, next) => {
    walkerServiceTools.getAllServices(req.app.get('db'))
      .then(services => {
        res.json(services);
      })
      .catch(next);
  });

module.exports = ServicesRouter;