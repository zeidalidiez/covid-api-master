'use strict';
const knex = require('knex');
/* globals supertest */
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Users Endpoints', function () {
  let db;

  const { testAppointments, testUsers } = helpers.makeVinylFixtures();
  const testUser = testUsers[0];


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /vinyl/Appointments', () => {
    beforeEach('insert Appointments', () => {
      return helpers.seedAppointmentUsers(
        db,
        testAppointments,
        testUsers
      );
    });
    it('responds with  empty appointment when appointment not seeded', () => {
      return supertest(app)
        .get('/vinyl/appointment')
        .set('authorization', helpers.makeAuthHeader(testUser))
        .expect(200, []);
    });
  });
});