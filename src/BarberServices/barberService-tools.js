'use strict';
const BarberServiceTools = {
  getAllServices(db) {
    return db
      .select('*')
      .from('services');

  },
  getById(knex, id) {
    return knex
      .from('services')
      .first('*')
      .where('id', id);
  },
};

module.exports = BarberServiceTools;