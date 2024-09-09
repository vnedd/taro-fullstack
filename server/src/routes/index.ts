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
import conversationRouter from './conversation';
import messageRouter from './message';
import pusherRouter from './pusher';

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
router.use('/conversations', conversationRouter);
router.use('/messages', messageRouter);
router.use('/pusher', pusherRouter);

export default router;
