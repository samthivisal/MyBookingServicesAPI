/**
 * Import express framework
 */
import * as express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

/**
 * Express router usage
 */
const router = express.Router();

router.get('/hello7', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello on duty!');
});

router.post('/hotel', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const email = request.body.email;
    const password = request.body.password;

    const docRef = db.collection('backofficeservice');

    // docRef.set({
    //     test : test,
    //     caca: caca
    // });


    response.status(200).send("user logged in successfully");

});

export default router;