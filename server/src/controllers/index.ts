import { Router } from 'express';
import homeRoutes from './homeRoutes';
import apiRoutes from './api';

const router = Router();

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

export default router;
