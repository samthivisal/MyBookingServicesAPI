/**
 * Import express framework
 */
import * as express from 'express';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Express router usage
 */
const router = express.Router();

/**
 * route to check front office service is up
 */
router.get('/hello_front_office_service', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello on duty!');
});

/**
 * route to get a hostel
 */
router.get('/hotel', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hotelId = request.body.hotelId;

    const docRef = db.collection('backofficeservice').doc('Hotels').collection(hotelId);

    const firebaseResponse = docRef.get()
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send(docRef.get().data());
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

export default router;