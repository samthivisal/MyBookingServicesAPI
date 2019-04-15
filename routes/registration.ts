/**
 * Import express framework
 */
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

import serviceAccount from '../ServiceAccountKey';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Express router usage
 */
const router = express.Router();

/**
 * route to check registration service is up
 */
router.get('/hello_registration', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('registration is on duty!');
});

/**
 * route to register an user
 */
router.post('/user', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const email = request.body.email;
    const password = request.body.password;

    const newUser = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        age: request.body.age
    };

    const firebaseResponse = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const newUID = response["user"].uid;

            /** put new user in collections "users" with UID from firebase as id */
            db.collection('users').doc(newUID).set(newUser);

            return {haveError: false, uid: newUID};
        })
        .catch(function (error) {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(`user created successfully : ${firebaseResponse["uid"]}`);
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