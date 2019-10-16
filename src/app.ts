import express from 'express';
import user from './api/user.route';
import connectToDbClient from './data_access/db_client';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';

const app = express();
const SWAGGER_YAML_FILE_PATH = 'swagger/api-v1.yaml';

connectToDbClient(); // connect to mongo database

// use middleware
app.use(express.json()); // use express body parser

// Swagger configuration for API documentation
const swaggerOptions = {
  customSiteTitle: 'Kased API',
  customCss: '.topbar { display: none }',
  showExplorer: true,
};

const swaggerDocument = YAML.load(`${__dirname}/${SWAGGER_YAML_FILE_PATH}`);

/**
 * @get /docs/api
 * @description Download swagger documentation YAML file
 * @public TODO - MAKE THIS A PRIVATE ROUTE
 */
app.use(
  '/docs/api',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

/**
 * @get /api
 * @description Test API route
 * @public
 */
app.get('/api', (req: express.Request, res: express.Response) => {
  res.send({ 'Kased API': 'Version 1' });
});


app.use('/api/user', user);

export default app;
