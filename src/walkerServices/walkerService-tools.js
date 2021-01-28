'use strict';
const walkerServiceTools = {
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

module.exports = walkerServiceTools;