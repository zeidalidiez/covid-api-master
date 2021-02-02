// const knex = require('knex');
const request = require("supertest")("https://coviddogwalking.herokuapp.com/covidapi");
const expect = require("chai").expect;
const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJpYXQiOjE2MTIyMjY0NTEsInN1YiI6ImRlbW91c2VyIn0.Gyv26tIGMZP83FWxy_JqIcu_csHFYuvHTOCt9E1dTbI"
const helpers = require("./test-helpers")

testUser = {
  user_name: 'demouser',
  password: 'demopassworD1!'
}


describe("Get /appointment", function () {
  it("return error due to lack of authentication", async function () {
    const response = await request.post("/appointment")

    .set('authorization', auth)

    expect(response.status).to.eql(200);
  });
});
