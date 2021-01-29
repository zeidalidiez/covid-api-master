const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;

describe("POST /user", function () {
  it("return error due to lack of required body", async function () {
    const response = await request.post("/user");

    expect(response.status).to.eql(400);
  });
});
