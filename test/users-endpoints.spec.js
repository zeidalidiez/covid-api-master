'use strict';
const knex = require('knex');
/* globals supertest */
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers' );

describe('Users Endpoints', function () {
  let db;

  const { testUsers } = helpers.makeVinylFixtures();
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

  describe('POST /vinyl/users', () => {
    context('User Validation', () => {
      beforeEach('insert users', () => {
        return helpers.seedUsers(
          db,
          testUsers
        );
      });

      const requiredFields = ['user_name', 'first_name', 'last_name', 'email', 'phone_number', 'password'];

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          user_name: 'user_name',
          password: 'password',
          first_name: 'first_name',
          last_name: 'last_name',
          email: 'email',
          phone_number: 'phone_number'
        };

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field];
          return supertest(app)
            .post('/vinyl/user')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            });
        });
      });
    });
  });
});