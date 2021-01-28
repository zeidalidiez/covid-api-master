'use strict';
const express = require('express');
const walkerService = require('./walkerService');
const { requireAuth } = require('../middleware/jwt-auth');
const walkerRouter = express.Router();

walkerRouter
  .route('/')
  .get((req, res, next) => {
    walkerService.getAllWalkers(req.app.get('db'))
      .then(walkers => {
        res.json(walkers);
      })
      .catch(next);
  });
walkerRouter 
  .route('/:walker_id')
  .all(requireAuth)
  .get((req,res)=>{
    walkerService.getById(req.app.get('db'),req.params.walker_id)
      .then(walker => {
        res.json(walker);
      });

  });

module.exports = walkerRouter;