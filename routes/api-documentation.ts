import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as express from 'express';
import * as path from 'path';

const swaggerDocumentPath = path.join(
  __dirname, '../../swagger.yml'
);

const swaggerDocument = YAML.load(swaggerDocumentPath);

/**
* Express router usage
*/
const router = express.Router();


/**
 * Serve contact api-documentation
 */
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;