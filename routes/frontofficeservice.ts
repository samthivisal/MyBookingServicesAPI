/**
 * Import express framework
 */
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as moment from 'moment';

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

    response.status(200).send('front office service is on duty!');
});

/**
 * route to get a hostel
 */
router.get('/hostel', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelID = request.body.hostelID;

    const docRef = db.collection('Hostels').doc(hostelID);

    docRef.get()
        .then(snapshot => {
            if (typeof snapshot.data() !== "undefined") {
                response.status(200).send(snapshot.data());
            } else {
                response.status(409).send('No hostel found with this ID');
            }
        })
        .catch((error) => {
            response.status(409).send(error.message);
        });
});

/**
 * route to get a room from specific hostel
 */
router.get('/room', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomID = request.body.roomID;

    const docRef = db.collection('Rooms').doc(roomID);

    docRef.get()
        .then(snapshot => {
            if (typeof snapshot.data() !== "undefined") {
                response.status(200).send(snapshot.data());
            } else {
                response.status(409).send('No room found with this ID');
            }
        })
        .catch((error) => {
            response.status(409).send(error.message);
        });
});

/**
 * route to get a room type
 */
router.get('/room-type', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomTypeID = request.body.roomTypeID;

    const docRef = db.collection('Room_Type').doc(roomTypeID);

    docRef.get()
        .then(snapshot => {
            if (typeof snapshot.data() !== "undefined") {
                response.status(200).send(snapshot.data());
            } else {
                response.status(409).send('No room type found with this ID');
            }
        })
        .catch((error) => {
            response.status(409).send(error.message);
        });
});

/**
 * route to book a room
 */
router.post('/book_room', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const startDate = moment(request.body.startDate).format('YYYY-MM-DD[T]HH:mm:ss');
    const endDate = moment(request.body.endDate).format('YYYY-MM-DD[T]HH:mm:ss');

    const roomBookedObj = {
        room: request.body.roomID,
        startDate: moment(startDate).unix(),
        endDate: moment(endDate).unix(),
        user: request.body.userID
    };

    // Create a new booked room
    const firebaseResponse = db.collection('Room_Booked').doc().set(roomBookedObj)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("Room booked successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }

    // Create a new booked parking if parking ID is specified
    if (request.body.parkingID !== "undefined") {
        const parkingBookedObj = {
            parking: request.body.parkingID,
            startDate: moment(startDate).unix(),
            endDate: moment(endDate).unix(),
            user: request.body.userID
        };

        const firebaseResponse2 = db.collection('Parking_Booked').doc().set(parkingBookedObj)
        .then((response) => {
            return {haveError: false};
        })
        .catch((error) => {
            return {haveError: true, message: error.message}
        });

        if (firebaseResponse2["haveError"]) {
            response.status(409).send(firebaseResponse2["message"]);
        }
    }
});

export default router;