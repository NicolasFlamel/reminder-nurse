import mongoose from 'mongoose';
import { ENV } from '../ENV';

const getLocalURI = () => {
  if (!ENV.MONGO_ROOT_USERNAME || !ENV.MONGO_ROOT_PASSWORD)
    throw new Error('Missing env');

  const uri = `mongodb://${
    ENV.MONGO_ROOT_USERNAME
  }:${ENV.MONGO_ROOT_PASSWORD}@127.0.0.1:27017/reminder-nurse?authSource=admin`;

  return uri;
};

mongoose.set('strictQuery', false);
mongoose.connect(ENV.MONGODB_URI || getLocalURI());

export default mongoose.connection;
