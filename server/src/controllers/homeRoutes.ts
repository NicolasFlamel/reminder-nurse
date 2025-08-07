import path from 'path';
import { Router } from 'express';

const router = Router();
const isProduction = process.env.NODE_ENV === 'production';

router.get('/{*any}', (req, res, next) => {
  if (!isProduction && req.originalUrl.startsWith('/graphql')) next();
  // TODO handle pathing
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
