const supertest = require("supertest");
const should = require("should");

var server = supertest.agent("http://localhost:3000");

const testLocationServer = (body) => {
  body.should.have.property('ip').and.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
  body.should.have.property('city').and.be.String();
  body.should.have.property('region').and.be.String();
  body.should.have.property('region_code').and.be.String();
  body.should.have.property('country').and.be.String();
  body.should.have.property('country_name').and.be.String();
  body.should.have.property('continent_code').and.be.String();
  body.should.have.property('in_eu').and.be.Boolean();
  body.should.have.property('postal').and.be.String();
  body.should.have.property('latitude').and.be.Number();
  body.should.have.property('longitude').and.be.Number();
  body.should.have.property('timezone').and.be.String();
  body.should.have.property('ip').and.be.String();
  body.should.have.property('utc_offset').and.be.String();
  body.should.have.property('country_calling_code').and.be.String();
  body.should.have.property('currency').and.be.String();
  body.should.have.property('languages').and.be.String();
  body.should.have.property('asn').and.be.String();
  body.should.have.property('org').and.be.String();
}

const testParticularLocation = (location) => {
  location.should.have.property('id').and.be.Number();
  location.should.have.property('name').and.be.String();
  location.should.have.property('country').and.be.String();
  location.should.have.property('coord').and.be.Object();
  location.coord.should.have.property('lon').and.be.Number();
  location.coord.should.have.property('lat').and.be.Number();
}

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
        testLocationServer(res.body);
        done();
    });
  });
});

/**
 * Test not exists route
 */
describe('GET /current/1234', function () {
  it('respond not found city in current service', function (done) {
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
 * Test current weather in server locations
 */
describe('GET /current', function () {
  it('check the structure of current weather in server location ', function (done) {
    server
      .get('/v1/current')
      .expect(404)
      .end(function(err, res){
        testLocationServer(res.body.location);
        done();
      });
  });
});

/**
 * Test current weather in server locations
 */
describe('GET /current/3435910', function () {
  it('check the structure of current weather in particular zone', function (done) {
    server
      .get('/v1/current/3435910')
      .expect(404)
      .end(function(err, res){
        testParticularLocation(res.body.location);
        done();
      });
  });
});

/**
 * Test not exists forecast
 */
describe('GET /forecast', function () {
  it('respond not found city in forecast service', function (done) {
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

/**
 * Test get forecast to 6 days by server location
 */
describe('GET /forecast', function () {
  it('get forecast to 6 days', function (done) {
    server
      .get('/v1/forecast')
      .expect(200)
      .end(function(err, res){
        res.body.weathers.should.have.size(6);
        done();
      });
  });
});

/**
 * Test the structure of forecast by server locations
 */
describe('GET /forecast', function () {
  it('Test the structure to 6 days', function (done) {
    server
      .get('/v1/forecast')
      .expect(200)
      .end(function(err, res){
        testLocationServer(res.body.location);
        res.body.should.have.property('weathers').and.be.Array();
        done();
      });
  });
});

/**
 * Test get forecast to 6 days by server location to buenos aires
 */
describe('GET /v1/forecast/3435910', function () {
  it('Test quantity of days to particular city', function (done) {
    server
      .get('/v1/forecast/3435910')
      .expect(200)
      .end(function(err, res){
        console.error(err);
        res.body.weathers.should.have.size(6);
        done();
      });
  });
});

/**
 * Test the structure of forecast by particular location
 */
describe('GET /v1/forecast/3435910', function () {
  it('get forecast to 6 days usign 3435910 Buenos Aires', function (done) {
    server
      .get('/v1/forecast/3435910')
      .expect(200)
      .end(function(err, res){
        testParticularLocation(res.body.location);
        res.body.should.have.property('weathers').and.be.Array();
        done();
      });
  });
});