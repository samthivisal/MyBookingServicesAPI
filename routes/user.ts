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
 * route to check user service is up
 */
router.get('/hello_user', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello on duty!');
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

            if (response !== null){
                uid = response["user"].uid;
            }

            return {haveError: false, uid: uid};
        })
        .catch(function (error) {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]){
        response.status(200).send(firebaseResponse["uid"]);
    } else {
        response.status(401).send(firebaseResponse["message"]);
    }
});

export default router;