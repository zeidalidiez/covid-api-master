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
      phone_number: '-4'
    },
  ];
}
function makeBarbersArray() {
  return [
    {
      id: 1,
      first_name: 'Shawn'
    },
    {
      id: 2,
      first_name: 'Ben'
    }
    ,
    {
      id: 3,
      first_name: 'Sara'
    }
    ,
    {
      id: 4,
      first_name: 'Kelly'
    }
    ,
    {
      id: 5,
      first_name: 'Travor'
    }
    ,
    {
      id: 6,
      first_name: 'Cameron'
    },
  ];
}
function makeBarberServicesArray() {
  return [
    {
      id: 1,
      type: 'HAIRCUT',
      price: '$20'
    },
    {
      id: 2,
      type: 'BUZZCUT',
      price: '$15'
    },
    {
      id: 3,
      type: 'KID 12 AND UNDER',
      price: '$10'
    },
    {
      id: 4,
      type: 'SENIOR CUT 60+',
      price: '$10'
    },
    {
      id: 5,
      type: 'DESIGNS',
      price: '$5'
    },
    {
      id: 6,
      type: 'BEARD TRIM',
      price: '$10'
    },
    {
      id: 7,
      type: 'BEARD TRIM (RAZOR FINISH)',
      price: '$15'
    },
    {
      id: 8,
      type: 'HAIRCUT AND BEARD TRIM',
      price: '$30'
    },
    {
      id: 9,
      type: 'LUXURY SHAVE',
      price: '$30'
    },
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
        barbers,
        services,
        appointments,
        vinyl_users
        RESTART IDENTITY CASCADE`
  );
}
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into('vinyl_users').insert(preppedUsers)
    .then(() => {
      return db.raw(
        'SELECT setval(\'vinyl_users_id_seq\', ?)',
        [users[users.length - 1].id]
      );
    }
    );
}
function seedBarbers(db, barbers) {
  return db('barbers')
    .insert(barbers)
    .then(() => {
      return db.raw(
        `SELECT setval('barbers_id_seq', ?)`,
        [barbers[barbers.length - 1].id]
      )
    })
}
function seedBarberServices(db, services) {
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

function makeVinylFixtures() {
  const testUsers = makeUsersArray();
  const testBarbers = makeBarbersArray()
  const testBarberServices = makeBarberServicesArray();
  const testAppointments = makeAppointmentsArray();
  return {
    testUsers,
    testBarbers,
    testBarberServices,
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
  makeBarbersArray,
  makeAppointmentsArray,
  cleanTables,
  seedUsers,
  seedBarbers,
  seedBarberServices,
  seedAppointments,
  seedAppointmentUsers,
  makeVinylFixtures,
  makeAuthHeader,

};