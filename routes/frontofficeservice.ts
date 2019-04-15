/**
 * Import express framework
 */
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
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

    response.status(200).send('Hello on duty!');
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
            if (typeof snapshot.data() !== "undefined"){
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
            if (typeof snapshot.data() !== "undefined"){
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
router.get('/room_type', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomTypeID = request.body.roomTypeID;

    const docRef = db.collection('Room_Type').doc(roomTypeID);

    docRef.get()
        .then(snapshot => {
            if (typeof snapshot.data() !== "undefined"){
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
router.post('/front/book_room', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    // const toFormat = "2019-04-15 10:00:00";
    // const date = moment(toFormat).format('YYYY-MM-DD[T]HH:mm:ss');
    // console.log(moment(date).unix());
    
    // var startdate = moment(request.body.startdate).unix();
    // var enddate = moment(request.body.enddate).unix();

    const roomBookedObj = {
        room: request.body.roomID,
        startdate: firebase.firestore.Timestamp.fromDate(new Date()),
        enddate: new Date("April 20, 2019"),
        user: request.body.userID
    };

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
});

export default router;