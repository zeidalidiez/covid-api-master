const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;

describe("GET /walker", function () {
  it("get all walkers info from database", async function () {
    const response = await request.get("/walker");

    expect(response.status).to.eql(200);
  });
});
