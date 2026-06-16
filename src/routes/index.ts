import { Router } from 'express';
import leadRoutes from './lead.routes';
import authRoutes from './auth.routes';



const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);

export default router;
