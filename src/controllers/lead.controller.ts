import { Request, Response } from 'express';
import { createLeadService, getLeadsService } from '../services/lead.service';
import { prisma } from '../config/prisma';
import { createLeadSchema } from '../validations/lead.validation';
import { sendLeadNotification } from '../services/email.service';

export const createLead = async (req: Request, res: Response) => {
  try {
    const validation = createLeadSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validation.error.flatten(),
      });
    }
    const { type, name, email, message } = req.body;

    if (!type || !name || !email || !message) {
      return res.status(400).json({
        message: 'Required fields missing',
      });
    }

    const lead = await createLeadService(req.body);

    try {
      await sendLeadNotification({
        name: lead.name,
        email: lead.email,
        company: lead.company ?? undefined,
        phone: lead.phone ?? undefined,
        subject: lead.subject ?? undefined,
        message: lead.message,
        type: lead.type,
      });
    } catch (error) {
      console.error('Email notification failed:', error);
    }

    return res.status(201).json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to create lead',
    });
  }
};

export const getLeads = async (_req: Request, res: Response) => {
  try {
    const leads = await getLeadsService();

    return res.json(leads);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch leads',
    });
  }
};
