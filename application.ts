/**
 * Import packages dependencies
 */
import * as createError from 'http-errors';
import * as express from 'express';
import * as bodyParser from 'body-parser';

/** Importing routes */
import bookingMiddleware from './routes/booking';

const application = express();

application.use(express.urlencoded({ extended: false }));
application.use(bodyParser.json());

application.options("/*", function(request, response, next){
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'OPTIONS, PATCH, PUT, DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    response.status(200);
    next();
});

application.use(
    '/',
    bookingMiddleware
);

// catch 404 and forward to error handler
application.use(function(request : any, response : any, next : any) {
    next(createError(404));
});

// error handler
application.use(function(error, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};

    // render the error page
    response.status(error.status || 500);

    /** Qualified unhandled before errors **/
    switch(error.status) {
        case 404 :
            response.send('Ressource not found');
            break;
        case 413 :
            response.send('Payload Too Large');
            break;
        default :
            response.send('Unhandled error');
            break;
    }

});

/**
 * Route to test API Rest
 */
application.get('/hello/', (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');

    response.status(200).send('Hello Trip-x on duty!');
});

export default application;
