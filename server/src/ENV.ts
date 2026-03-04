import 'dotenv/config';

const {
  JWT_EXP,
  JWT_SECRET,
  MONGO_ROOT_PASSWORD,
  MONGO_ROOT_USERNAME,
  MONGODB_URI,
  NODE_ENV,
  PORT,
} = process.env;

export const ENV = {
  JWT_EXP,
  JWT_SECRET,
  MONGO_ROOT_PASSWORD,
  MONGO_ROOT_USERNAME,
  MONGODB_URI,
  NODE_ENV,
  PORT,
};
