/**
 * Import express framework
 */
import * as express from 'express';

import createUser from "../firebase/registration";

/**
 * Express router usage
 */
const router = express.Router();

router.get('/hello9', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello on duty!');
});

router.post('/user', async (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const email = request.body.email;
    const password = request.body.password;

    const firebaseResponse = await createUser(email, password)
        .then((response) => {
            return response;
        });

    if (!firebaseResponse["haveError"]) {
        response.status(200).send("user created successfully");
    } else {
        response.status(409).send(firebaseResponse["message"]);
    }
});

export default router;