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

function getHostelUID(hostelID)
{

}

/**
 * route to get a hostel
 */
router.get('/hostel', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelID = request.body.hostelID;

    const docRef = db.collection('Hotels').where('id', '==', hostelID);

    docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(409).send('No such document!');
        return;
      } 
      snapshot.forEach(doc => {
          response.status(200).send(doc.id);
      });
    })
    .catch(err => {
        response.status(409).send(err);
    });
});

/**
 * route to get a room from specific hotel
 */
router.get('/room', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelID = request.body.hostelID;
    const roomID = request.body.roomID;
    
    // Get hostel UID
    var hostelUID = "";
    const docRef = db.collection('Hotels').where('id', '==', hostelID);

    docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(409).send('No such document!');
        return;
      }

      snapshot.forEach(doc => {
        hostelUID = doc.id;
      });
    })
    .catch(err => {
        response.status(409).send(err);
    });

    // Get room UID
    const docRefHostel = db.collection('Hotels/' + hostelUID).where('id', '==', roomID);

    docRefHostel.get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(409).send('No such document!');
        return;
      }

      snapshot.forEach(doc => {
        response.status(200).send(doc.id);
      });
    })
    .catch(err => {
        response.status(409).send(err);
    });
});

/**
 * route to get a room type
 */
router.get('/room_type', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const roomTypeID = request.body.roomTypeID;

    const docRef = db.collection('Room_Type').where('id', '==', roomTypeID);

    docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(409).send('No such document!');
        return;
      } 
      snapshot.forEach(doc => {
          response.status(200).send(doc.id);
      });
    })
    .catch(err => {
        response.status(409).send(err);
    });
});

/**
 * route to book a room
 */
router.post('/front/book_room', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    const hostelID = request.body.hostelID;
    const roomID = request.body.roomID;

    // Get hostel UID
    var hostelUID = "";
    const docRef = db.collection('Hotels').where('id', '==', hostelID);

    docRef.get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(409).send('No such document!');
        return;
      }

      snapshot.forEach(doc => {
        hostelUID = doc.id;
      });
    })
    .catch(err => {
        response.status(409).send(err);
    });

    // Get room UID
    const docRefHostel = db.collection('Hotels/' + hostelUID).where('id', '==', roomID);

    docRefHostel.get()
    .then(snapshot => {
      if (snapshot.empty) {
        response.status(409).send('No such document!');
        return;
      }

      snapshot.forEach(doc => {
        response.status(200).send(doc.id);
      });
    })
    .catch(err => {
        response.status(409).send(err);
    });
});

export default router;