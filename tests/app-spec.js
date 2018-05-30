"user strict";
const request = require('supertest'),
    server = require('../app'),
    config = require('../config');

describe('Express server', function () {

    this.timeout(4000);

    it('/', done => {
        request(server)
            .get('/')
            .expect(200, done)
    });

    it('/commands/luncbot with valid token', done => {
        request(server)
            .post('/commands/lunchbot')
            .set('Accept', 'application/json')
            .send({ token : config('LUNCHBOT_COMMAND_TOKEN')})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('/commands/luncbot with parameter', done => {
        request(server)
            .post('/commands/lunchbot')
            .set('Accept', 'application/json')
            .send({ token : config('LUNCHBOT_COMMAND_TOKEN'), text: 'hermia'})
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('/commands/luncbot with invalid token', done => {
        request(server)
            .post('/commands/lunchbot')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401, done)
    });
});
