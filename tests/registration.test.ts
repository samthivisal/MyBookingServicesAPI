import * as request from 'supertest';
import * as expect from 'expect';
import application from '../application';

const contactConfirmationMail = {
    email: "admin@mybookingservice.com",
};

describe('it should test registration routes', () => {
    it('Should be OK for : get /hello_registration', (done) => {
        request(application)
            .get('/hello_registration')
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual('registration is on duty!');
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();

            });
    });

    it('Should be OK for : post /send-email-confirmation', (done) => {
        request(application)
            .post('/send-email-confirmation')
            .send(contactConfirmationMail)
            .expect(200)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }

                done();
            });
    });
});