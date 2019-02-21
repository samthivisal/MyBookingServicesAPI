/**
 * Import express framework
 */
import * as express from 'express';

/**
 * Express router usage
 */
const router = express.Router();

router.get('/hello', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello on duty!');
});

export default router;