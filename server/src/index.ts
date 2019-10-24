import * as dotenv from 'dotenv';
dotenv.config(); // config environment files

import app from './app';
import logger from './helpers/logger';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => logger.debug(`App runnning on PORT: ${PORT} 🔥`)); // express server
