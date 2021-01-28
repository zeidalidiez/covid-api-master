'use strict';

const xss = require('xss');

const walkerService = {
  getAllWalkers(db){
    return db
      .select('*')
      .from('walkers');
        
  },
  getById(knex,id){
    return knex
      .from('walkers')
      .first('*')
      .where('id',id);
  },
};

module.exports = walkerService;