import { Router } from 'express';
import { login } from '../controllers/auth.controller';



const router = Router();

router.get('/test', (_, res) => {
  res.json({ message: 'auth works' });
});

router.post('/login', login);

export default router;
