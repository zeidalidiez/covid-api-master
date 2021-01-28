'use strict';

const xss = require('xss');

const BarberService = {
  getAllBarbers(db){
    return db
      .select('*')
      .from('barbers');
        
  },
  getById(knex,id){
    return knex
      .from('barbers')
      .first('*')
      .where('id',id);
  },
};

module.exports = BarberService;