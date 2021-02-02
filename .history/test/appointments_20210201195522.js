// // const knex = require('knex');
// const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
// const expect = require("chai").expect;
// const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE2MTIyMjY0NTEsInN1YiI6ImRlbW91c2VyIn0.Gyv26tIGMZP83FWxy_JqIcu_csHFYuvHTOCt9E1dTbI"



// describe("GET /appointment", function () {
//   it("return error due to lack of authentication", async function () {
//     const response = await request.get("/appointment");

//     expect(response.status).to.eql(500);
//   });
// });















// it("allows an user to set and delete an appointment", async function () {
//   // Check that a user can create an appointment
//   const postResponse = await request
//     .post("/appointments")
//     .set("Authorization", `Bearer token=${auth}`)
//     .send({
//       time: "7:00 AM", 
//       services_id: "1", 
//       walker_id: "1"
//     });

//   expect(postResponse.status).to.eql(201);
//   expect(postResponse.body.data.attributes.time).to.eql("7:00 AM");
//   expect(postResponse.body.data.attributes.walker_id).to.eql("1");
//   // Check that a user can delete the created favorite.
//   const deleteResponse = await request
//     .delete(`/appointments/24`)
//     .set("Authorization", `Bearer token=${auth}`);

//   expect(deleteResponse.status).to.eql(204);

//   // Verify that the record was deleted.
//   const getResponse = await request
//     .get(`/appointments/24`)
//     .set("Authorization", `Bearer token=${auth}`);

//   expect(getResponse.status).to.eql(404);
// });


'use strict';
const knex = require('knex');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const helpers = require('./test-helpers');
const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");

describe('Users Endpoints', function () {
  let db;

  const { testAppointments, testUsers } = helpers.makeFixtures();
  const testUser = testUsers[0];


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.HEROKU_POSTGRESQL_RED_URL,
    });
    app.set('db', db);
  });

  // after('disconnect from db', () => db.destroy());

  // before('cleanup', () => helpers.cleanTables(db));

  // afterEach('cleanup', () => helpers.cleanTables(db));

  // describe('GET /covidapi/appointments', () => {
  //   beforeEach('insert appointments', () => {
  //     return helpers.seedAppointmentUsers(
  //       db,
  //       testAppointments,
  //       testUsers
  //     );
  //   });
    it('responds with  empty appointment when appointment not seeded', () => {
      return supertest(request)
        .get('/covidapi/appointment')
        .set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE2MTIyMzc3MzYsInN1YiI6ImRlbW91c2VyIn0.-SoVc5Yo4WI8fkh3U5PLktclgf42JpbOGqGbO8PfjEI")
        .expect(200, []);
        done()
    });
  });
