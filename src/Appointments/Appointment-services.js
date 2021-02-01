'use strict';
const AppointmentService = {
  getAppointments(db,userId) {
    return db
      .from('appointments AS app')
      .select(
        'app.id',
        'app.time',
        'walkers.first_name',
        'services.type'
      )
      .leftJoin(
        'walkers',
        'app.walker_id',
        'walkers.id'
      )
      .leftJoin(
        'services',
        'app.services_id',
        'services.id'
      )
      .where('app.users_id',userId);

  },
  getById(db, appId) {
    return db
      .from('appointments AS app')
      .select(
        'app.id',
        'app.time',
        'app.date_created',
        'app.users_id',
        'walkers.first_name',
        'services.type'
      )
      .leftJoin(
        'walkers',
        'app.walker_id',
        'walkers.id' 
      )
      .leftJoin(
        'services',
        'app.services_id',
        'services.id'
      )
      .first()
      .where('app.id', appId);
  },
  insertAppointment(db, User) {
    return db
      .insert(User)
      .into('appointments')
      .returning('*')
      .then(([user]) => user);
  },
  deleteAppointment(db, appId) {
    return db('appointments')
      // .from('appointments AS app')
      .where({ 'id': appId })
      .delete();
  },
};

module.exports = AppointmentService;