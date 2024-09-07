import { Router } from 'express';
import authRouter from './auth';
import categoryRouter from './category';
import styleRouter from './style';
import colorRouter from './color';
import sizeRouter from './size';
import productRouter from './product';
import checkoutRouter from './checkout';
import orderRouter from './order';
import trackingRouter from './tracking';
import userRouter from './user';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/styles', styleRouter);
router.use('/sizes', sizeRouter);
router.use('/colors', colorRouter);
router.use('/products', productRouter);
router.use('/checkout', checkoutRouter);
router.use('/orders', orderRouter);
router.use('/trackings', trackingRouter);

export default router;
