/**
 * Import packages dependencies
 */
import * as createError from 'http-errors';
import * as express from 'express';
import * as bodyParser from 'body-parser';

/** Importing routes */
import registrationMiddleware from './routes/registration';
import userMiddleware from './routes/user';
import backofficeserviceMiddleware from './routes/backofficeservice';
import frontofficeserviceMiddleware from './routes/frontofficeservice';
import apidocumentationMiddleware from './routes/api-documentation';

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



/** Add all middleware in routes folder */
application.use('/api-documentation', apidocumentationMiddleware);
application.use('/', registrationMiddleware);
application.use('/', userMiddleware);
application.use('/', backofficeserviceMiddleware);
application.use('/front', frontofficeserviceMiddleware);

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

export default application;
