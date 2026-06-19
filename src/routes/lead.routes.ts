import { Router } from 'express';
import { createLead, exportLeads, getLeadById, getLeads, getLeadStats } from '../controllers/lead.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticateAdmin, getLeads);
router.get(
  '/stats',
  authenticateAdmin,
  getLeadStats,
);
router.get(
  '/export',
  authenticateAdmin,
  exportLeads,
);
router.post('/', createLead);
router.get(
  '/:id',
  authenticateAdmin,
  getLeadById,
);
router.get('/health', (_, res) => {
  res.json({
    status: 'ok',
  });
});

export default router;