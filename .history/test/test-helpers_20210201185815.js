'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'user_name-1',
      password: 'password-1',
      first_name: 'first_name-1',
      last_name: 'last_name-1',
      email: 'email-1',
      phone_number: 1,
    },
    {
      id: 2,
      user_name: 'user_name-2',
      password: 'password-2',
      first_name: 'first_name-2',
      last_name: 'last_name-2',
      email: 'email-2',
      phone_number: 2,
    },
    {
      id: 3,
      user_name: 'user_name-3',
      password: 'password-3',
      first_name: 'first_name-3',
      last_name: 'last_name-3',
      email: 'email-3',
      phone_number: 3,
    },
    {
      id: 4,
      user_name: 'user_name-4',
      password: 'password-4',
      first_name: 'first_name-4',
      last_name: 'last_name-4',
      email: 'email-4',
      phone_number: 4    },
  ];
}
function makeWalkersArray() {
  return [
    {
      id: 1,
      first_name: 'Bobby'
    },
    {
      id: 2,
      first_name: 'Benny'
    }
    ,
    {
      id: 3,
      first_name: 'Sarby'
    }
    ,
    {
      id: 4,
      first_name: 'Darby'
    }
    ,
    {
      id: 5,
      first_name: 'Garby'
    }
    ,
    {
      id: 6,
      first_name: 'Harmy'
    },
  ];
}
function makeWalkerServicesArray() {
  return [
    {
      id: 1,
      type: 'Single dog',
      price: '$20'
    },
    {
      id: 2,
      type: 'Two dogs',
      price: '$25'
    },
    {
      id: 3,
      type: 'Three dogs',
      price: '$30'
    },
    {
      id: 4,
      type: 'Four dogs (Maximum)',
      price: '$35'
    }
  ];
}
function makeAppointmentsArray() {
  return [
    {
      id: 1,
      time: '8:00',
    }
    ,
    {
      id: 2,
      time: '9:00'
    },
    {
      id: 3,
      time: '2:00',
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
        walkers,
        services,
        appointments,
        covidapi_users
        RESTART IDENTITY CASCADE`
  );
}
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into('covidapi_users').insert(preppedUsers)
    .then(() => {
      return db.raw(
        'SELECT setval(\'covidapi_users_id_seq\', ?)',
        [users[users.length - 1].id]
      );
    }
    );
}
function seedWalkers(db, walkers) {
  return db('walkers')
    .insert(walkers)
    .then(() => {
      return db.raw(
        `SELECT setval('barbers_id_seq', ?)`,
        [barbers[barbers.length - 1].id]
      )
    })
}
function seedWalkerServices(db, services) {
  return db('services')
    .insert(services)
    .then(() => {
      return db.raw(
        `SELECT setval('services_id_seq',?)`,
        [services[services.length - 1].id]
      )
    })
}

function seedAppointments(db, appointments) {
  return db('appointments')
    .insert(appointments)
    .then(() => {
      return db.raw(
        `SELECT setval('appointments_id_seq', ?)`,
        [appointments[appointments.length - 1].id])
    });
}
function seedAppointmentUsers(db, appointments, users) {
  return db.transaction(async () => {
    await seedAppointments(db, appointments)
    await seedUsers(db, users)
  })
}
// function seedUserAppointments(db, users, barbers, services) {
//   return db.transaction(async () => {
//     await seedBarbers(db, barbers)
//     await seedUsers(db, users)
//     await seedservices(db, services)
//     await seedUserSquads(db, users[0], squads)
//   })
// }

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testBarbers = makeWalkersArray()
  const testBarberServices = makeWalkerServicesArray();
  const testAppointments = makeAppointmentsArray();
  return {
    testUsers,
    testWalkers,
    testWalkerServices,
    testAppointments
  }
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256'
  })

  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeWalkersArray,
  makeAppointmentsArray,
  cleanTables,
  seedUsers,
  seedWalkers,
  seedWalkerServices,
  seedAppointments,
  seedAppointmentUsers,
  makeFixtures,
  makeAuthHeader
};