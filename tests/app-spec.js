const should = require('should'),
    request = require('supertest'),
    server = require('../app');

describe('Express server', () => {

    it('/', done => {
        request(server)
            .get('/')
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
