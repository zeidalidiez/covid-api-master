'use strict';
const knex = require('knex');
/* globals supertest */
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Users Endpoints', function () {
  let db;

  const { testBarbers } = helpers.makeVinylFixtures();


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

  describe('GET /vinyl/BarberBarbers', () => {
    beforeEach('insert Barbers', () => {
      return helpers.seedBarbers(
        db,
        testBarbers
      );
    });
    const expectedBarbers = testBarbers.map(barber => {
      return {
        ...barber
      }
    })


    it('responds 200 with the BarberService list', () => {
      return supertest(app)
        .get('/vinyl/barber')
        .expect(200, expectedBarbers);
    });
  });
});