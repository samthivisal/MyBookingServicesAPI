import * as request from 'supertest';
import * as expect from 'expect';
import application from '../application';

const contactConfirmationMail = {
    email: "admin@mybookingservice.com",
};

const exampleBody = {
    token : "8Pd2KSASkMRmUhkYkIAwSdbB5Rw2"
};

describe('it should test user routes', () => {
    it('Should be OK for : get /hello_registration', (done) => {
        request(application)
            .get('/hello_user')
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual('user is on duty!');
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();

            });
    });

    it('Should be OK for : get /user/:token', (done) => {
        request(application)
            .get(`/user/${exampleBody.token}`)
            .expect(200)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();

            });
    });

    it('Should be OK for : get /reset-password/:token', (done) => {
        request(application)
            .get(`/reset-password/${exampleBody.token}`)
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual('Password reset confirmation has been sent to user');
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();

            });
    });

    it('Should be OK for : get /user/delete', (done) => {
        request(application)
            .post(`/user/delete`)
            .send(contactConfirmationMail)
            .expect(200)
            .expect((res) => {
                expect(res.text).toEqual(`${contactConfirmationMail.email} has been successfully deleted`);
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                done();

            });
    });
});