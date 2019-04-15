import * as request from 'supertest';
import * as expect from 'expect';
import application from '../application';

const contactConfirmationMail = {
    email: "admin@mybookingservice.com",
};

const exampleBody = {
    token : "exampleToken"
};

describe('it should test back office service routes', () => {
    it('Should be OK for : get /hello_back_office_service', (done) => {
        request(application)
            .get('/hello_back_office_service')
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual('back office service is on duty!');
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();

            });
    });
});