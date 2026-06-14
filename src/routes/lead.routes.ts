import { Router } from 'express';
import { createLead, getLeads } from '../controllers/lead.controller';
const router = Router();
export default router;
router.get("/", getLeads);
router.post("/", createLead);

router.get("/health", (_, res) => {
  res.json({
    status: "ok",
  });
});
