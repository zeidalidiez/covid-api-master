const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;

describe("GET /appointment", function () {
  it("return error due to lack of authentication", async function () {
    const response = await request.get("/appointment");

    expect(response.status).to.eql(500);
  });
});

describe ("POST Appoiuntment", function () {
  it("it shoud return status code 400 if we dosent send anything", function(done)){
  supertest(app)
    .post("/")
    .send({})
    .expect(400)
    .end(function(err, res){
      if (err) done(err);
      done();
    });
});
