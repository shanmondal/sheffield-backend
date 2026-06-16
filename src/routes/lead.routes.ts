import { Router } from 'express';
import { createLead, getLeads } from '../controllers/lead.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateAdmin, getLeads);
router.post('/', createLead);

router.get('/health', (_, res) => {
  res.json({
    status: 'ok',
  });
});

export default router;