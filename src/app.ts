import express from 'express';
import cookieParser from 'cookie-parser';
import auth from './api/auth.route';
import user from './api/user.route';
import category from './api/category.route';
import product from './api/product.route';
import connectToDbClient from './data_access/db_client';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';

const app = express();
const SWAGGER_YAML_FILE_PATH = 'swagger/api-v1.yaml';

connectToDbClient(); // connect to mongo database

// use middleware
app.use(express.json()); // use express body parser to access req.body
app.use(cookieParser()); // use express cookie parser to parse cookie header and populate req.cookies

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

// api routes
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/category', category);
app.use('/api/product', product);

export default app;
