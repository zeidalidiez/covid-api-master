const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;

describe("GET /walker", function () {
  it("returns all books on end database", async function () {
    const response = await request.get("/walker");

    expect(response.status).to.eql(200);
  });
});
