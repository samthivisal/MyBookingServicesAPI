/**
 * Import express framework
 */
import * as express from 'express';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * Express router usage
 */
const router = express.Router();

/**
 * route to check back office service is up
 */
router.get('/hello_back_office_service', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello on duty!');
});

/**
 * route ADD Hostel
 */
router.post('/hotel', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelObject = {
        name: request.body.name,
        stars: request.body.stars
    };

    const docRef = db.collection('backofficeservice').doc('Hotels');
    const randomId = docRef.id;

    const firebaseResponse = docRef.collection(randomId).add(hostelObject)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("Hostel added successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

/**
 * route ADD room to a specific hostel
 */
router.post('/hotel/add_room', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hotelId = request.body.hotelId;
    const roomId = request.body.roomId;

    const docRef = db.collection('backofficeservice').doc('Hotels');
    const randomId = docRef.id;

    const firebaseResponse = docRef.collection(randomId).doc(hotelId).set({roomId : roomId})
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("room added successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

export default router;