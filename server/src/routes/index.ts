import { Router } from 'express';
import authRouter from './auth';
import categoryRouter from './category';

const router = Router();

router.use('/auth', authRouter);
router.use('/categories', categoryRouter);

export default router;
