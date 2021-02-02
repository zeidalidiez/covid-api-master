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














it("allows an user to set and delete an appointment", async function () {
  // Check that a user can create a favorite.
  const postResponse = await request
    .post("/favorites")
    .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`)
    .send({
      airport_id: "JFK",
      note: "My usual layover when visiting family",
    });

  expect(postResponse.status).to.eql(201);
  expect(postResponse.body.data.attributes.airport.name).to.eql("John F Kennedy International Airport");
  expect(postResponse.body.data.attributes.note).to.eql("My usual layover when visiting family");

  const favoriteId = postResponse.body.data.id;

  // Check that a user can update the note of the created favorite.
  const putResponse = await request
    .put(`/favorites/${favoriteId}`)
    .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`)
    .send({
      note: "My usual layover when visiting family and friends",
    });

  expect(putResponse.status).to.eql(200);
  expect(putResponse.body.data.attributes.note).to.eql("My usual layover when visiting family and friends");

  // Check that a user can delete the created favorite.
  const deleteResponse = await request
    .delete(`/favorites/${favoriteId}`)
    .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

  expect(deleteResponse.status).to.eql(204);

  // Verify that the record was deleted.
  const getResponse = await request
    .get(`/favorites/${favoriteId}`)
    .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`);

  expect(getResponse.status).to.eql(404);
});