// const knex = require('knex');
const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;

// describe('API:', function () {
//   let db;
//   let testUsers = [{
//     "id": 1,
//     "user_name": "email@email.com",
//     "password": "$2a$12$puiYyy7dAMOBuL.vMwp8kephkPWl8puUkGaY40JYvJHNClFWLnZ2G"
//   }];
//   let testAppointments = [{
//     "id": 1,
//     "time": "7:00 AM",
//     "tomorrow": "",
//     "date_created": false,
//   }];
  
//   before('make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DATABASE_URL,
//     });
//     app.set('db', db);
//   });

//   before('cleanup', () => db.raw('TRUNCATE TABLE users, locations, user_locations, comments RESTART IDENTITY CASCADE;'));

//   afterEach('cleanup', () => db.raw('TRUNCATE TABLE users, locations, user_locations, comments RESTART IDENTITY CASCADE;'));

//   after('disconnect from the database', () => db.destroy());


//   beforeEach('insert some comments', async () => {
//     await db('users').insert(testUsers);
//     await db('locations').insert(testLocations);
//     await db('user_locations').insert(testUserLocations);
//     await db('comments').insert(testComments);

//     return db.transaction(async trx => {
//       await trx.raw(
//         `SELECT setval('users_id_seq', ?)`,
//         [testUsers[testUsers.length - 1].id],
//       );
//       await trx.raw(
//         `SELECT setval('locations_id_seq', ?)`,
//         [testLocations[testLocations.length - 1].id],
//       );
//       await trx.raw(
//         `SELECT setval('user_locations_id_seq', ?)`,
//         [testUserLocations[testUserLocations.length - 1].id],
//       );
//       await trx.raw(
//         `SELECT setval('comments_id_seq', ?)`,
//         [testComments[testComments.length - 1].id],
//       );
//     });


//   });





describe("GET /appointment", function () {
  it("return error due to lack of authentication", async function () {
    const response = await request.get("/appointment");

    expect(response.status).to.eql(500);
  });
});

describe("POST /appointment", function () {
  it("return error due to lack of authentication", async function () {
    const response = await request.get("/appointment");

    expect(response.status).to.eql(500);
  });
});


describe("DELETE /appointment/appointment_id", function () {
  it("attempt to delete appointment id 1 with bearer token and without auth", async function () {
    const response = await request.delete("/appointment/1");

    expect(response.status).to.eql(500);
  });
});