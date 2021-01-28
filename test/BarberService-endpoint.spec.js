'use strict';
const knex = require('knex');
/* globals supertest */
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Users Endpoints', function () {
  let db;

  const { testBarberServices } = helpers.makeVinylFixtures();


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

  describe('GET /vinyl/BarberServices', () => {
    beforeEach('insert Services', () => {
      return helpers.seedBarberServices(
        db,
        testBarberServices
      );
    });
    const expectedservice = testBarberServices.map(service => {
      return {
        ...service
      }
    })


    it('responds 200 with the BarberService list', () => {
      return supertest(app)
        .get('/vinyl/services')
        .expect(200, expectedservice);
    });
  });
});