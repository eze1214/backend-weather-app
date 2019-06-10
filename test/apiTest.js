const supertest = require("supertest");
const should = require("should");

var server = supertest.agent("http://localhost:3000");
//==================== user API test ====================

/**
 * Testing location service
 */
describe('GET /v1/location', function () {
  it('respond with json containing the server location', function (done) {
    server
      .get("/v1/location")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res){
        done();
    });
  });
});

/**
 * Testing location service
 */
describe('GET /v1/location', function () {
  it('check the structure of server location', function (done) {
    server
      .get("/v1/location")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res){
        res.body.should.have.property('ip').and.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
        res.body.should.have.property('city').and.be.String();
        res.body.should.have.property('region').and.be.String();
        res.body.should.have.property('region_code').and.be.String();
        res.body.should.have.property('country').and.be.String();
        res.body.should.have.property('country_name').and.be.String();
        res.body.should.have.property('continent_code').and.be.String();
        res.body.should.have.property('in_eu').and.be.Boolean();
        res.body.should.have.property('postal').and.be.String();
        res.body.should.have.property('latitude').and.be.Number();
        res.body.should.have.property('longitude').and.be.Number();
        res.body.should.have.property('timezone').and.be.String();
        res.body.should.have.property('ip').and.be.String();
        res.body.should.have.property('utc_offset').and.be.String();
        res.body.should.have.property('country_calling_code').and.be.String();
        res.body.should.have.property('currency').and.be.String();
        res.body.should.have.property('languages').and.be.String();
        res.body.should.have.property('asn').and.be.String();
        res.body.should.have.property('org').and.be.String();
        done();
    });
  });
});

/**
 * Test not exists route
 */
describe('GET /current/1234', function () {
  it('respond not found city', function (done) {
    server
      .get('/v1/current/1234')
      .expect(404)
      .end(function(err, res){
        res.body.statusCode.should.equal(404);
        res.body.message.should.equal("Not found city");
        done();
      });
  });
});

/**
 * Test not exists forecast
 */
describe('GET /forecast/unknown', function () {
  it('respond not found city', function (done) {
    server
      .get('/v1/forecast/1234')
      .expect(404)
      .end(function(err, res){
        res.body.statusCode.should.equal(404);
        res.body.message.should.equal("Not found city");
        done();
      });
  });
});