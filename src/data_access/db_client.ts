import mongoose from 'mongoose';
import logger from '../helpers/logger';
import { SuccessMessage, ErrorMessage } from '../constants';

const DB_HOST = `${process.env.DB_HOST}`;

const connectToDbClient = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    logger.info(`${SuccessMessage.DB_CONNECTION} ✅`);
  } catch (err) {
    logger.error(`${ErrorMessage.DB_CONNECTION} 🛑: ${err}`);
  }
};

export default connectToDbClient;
