/**
 * Import express framework
 */
import * as express from 'express';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

/**
 * Express router usage
 */
const router = express.Router();

const db = admin.firestore();

/**
 * route to check user service is up
 */
router.get('/hello_user', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('user is on duty!');
});

/**
 * route to get an user info from a token
 */
router.get('/user/:token', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const token = request.params.token;

    db.collection("Users").doc(token).get()
        .then((snapshot) => {
            if (typeof snapshot.data() !== "undefined"){
                response.status(200).send(`User info from token : ${JSON.stringify(snapshot.data())}`);
            } else {
                response.status(409).send(`no user found for this Id`);
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(409).send(error.message);
        });
});

/**
 * route to send a password reset confirmation to an user
 */
router.get('/reset-password/:token', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send(`Password reset confirmation has been sent to user`);
});

/**
 * route to log an user
 */
router.post('/user/login', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const email = request.body.email;
    const password = request.body.password;

    const firebaseResponse = await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            let uid = "";

            if (response !== null) {
                uid = response["user"].uid;
            }

            return {haveError: false, uid: uid};
        })
        .catch(function (error) {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(firebaseResponse["uid"]);
    } else {
        response.status(401).send(firebaseResponse["message"]);
    }
});

/**
 * route to delete current user
 */
router.post('/user/delete', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const email = request.body.email;
    const password = request.body.password;
    const token = request.body.token;

    response.status(200).send(`${email} has been successfully deleted`);
});

export default router;