/**
 * Import express framework
 */
import * as express from 'express';
import * as firebase from 'firebase';

/**
 * Express router usage
 */
const router = express.Router();

/**
 * route to check registration service is up
 */
router.get('/hello_registration', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello on duty!');
});

/**
 * route to register an user
 */
router.post('/user', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const email = request.body.email;
    const password = request.body.password;

    const firebaseResponse = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            return {haveError: false};
        })
        .catch(function (error) {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("user created successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route to send a confirmation email to a specific user
 */
router.post('/send-email-confirmation', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const email = request.body.email;

    response.status(200).send(`email sent to ${email} successfully`);
});

export default router;