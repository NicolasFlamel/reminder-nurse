import path from 'path';
import { Router } from 'express';
import { ENV } from '../ENV';
import { CLIENT_DIST } from '../utils/paths';

const router = Router();
const isProduction = ENV.NODE_ENV === 'production';

router.get('/{*any}', (req, res, next) => {
  if (!isProduction && req.originalUrl.startsWith('/graphql')) next();

  res.sendFile(path.join(CLIENT_DIST, './index.html'));
});

export default router;
