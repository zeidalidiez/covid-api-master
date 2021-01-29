const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;

describe("POST /auth/token", function () {
  it("return error due to lack of authentication", async function () {
    const response = await request.post("/auth/token");

    expect(response.status).to.eql(500);
  });
});
