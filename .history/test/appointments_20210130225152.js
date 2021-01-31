const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;

describe("GET /appointment", function () {
  it("return error due to lack of authentication", async function () {
    const response = await request.get("/appointment");

    expect(response.status).to.eql(500);
    done();
  });
});

describe("POST /appointment", function () {
  it("return error due to lack of authentication", async function () {
    const response = await request.post("/appointment");

    send({  time: "7:00", services_id: "1", walker_id: "1" })

    expect(response.status).to.eql(200);
    done();
  });
});
