import { Router } from 'express';
import engine from './engine/engine.route';

const router: Router = Router();

router.use('/engine', engine);

export default router;
