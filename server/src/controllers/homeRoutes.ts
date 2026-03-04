import path from 'path';
import { Router } from 'express';
import { ENV } from '../ENV';

const router = Router();
const isProduction = ENV.NODE_ENV === 'production';

router.get('/{*any}', (req, res, next) => {
  if (!isProduction && req.originalUrl.startsWith('/graphql')) next();

  const CLIENT_PATH = path.resolve(__dirname, '../../../client/dist');
  res.sendFile(path.join(CLIENT_PATH, './dist/index.html'));
});

export default router;
