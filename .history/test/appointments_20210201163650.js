// const knex = require('knex');
const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;
const auth = require("../src/auth/auth-service")



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
  // Check that a user can create an appointment
  const postResponse = await request
    .post("/appointments")
    .set("Authorization", `Bearer token=${process.env.AIRPORT_GAP_TOKEN}`)
    .send({
      time: "", 
      services_id, 
      walker_id
    });

  expect(postResponse.status).to.eql(201);
  expect(postResponse.body.data.attributes.time).to.eql("John F Kennedy International Airport");
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