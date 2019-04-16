import * as request from 'supertest';
import * as expect from 'expect';
import application from '../application';

const contactConfirmationMail = {
    email: "admin@mybookingservice.com",
};

const exampleBody = {
    token : "exampleToken"
};

describe('it should test front office service routes', () => {
    it('Should be OK for : get /hello_front_office_service', (done) => {
        request(application)
            .get('/hello_front_office_service')
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual('front office service is on duty!');
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();

            });
    });
});