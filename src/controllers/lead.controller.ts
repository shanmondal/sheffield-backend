import { Request, Response } from 'express';
import {
  createLeadService,
  getLeadsService,
} from '../services/lead.service';
import { createLeadSchema } from '../validations/lead.validation';
import { sendMailToQueue } from '../services/mail-queue.service';

export const createLead = async (
  req: Request,
  res: Response,
) => {
  try {
    const validation = createLeadSchema.safeParse(
      req.body,
    );

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

    sendMailToQueue({
      name: lead.name,
      email: lead.email,
      company: lead.company ?? undefined,
      phone: lead.phone ?? undefined,
      subject: lead.subject ?? undefined,
      message: lead.message,
      type: lead.type,
    }).catch((error) => {
      console.error(
        'Failed to push mail to SQS:',
        error,
      );
    });

    return res.status(201).json(lead);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to create lead',
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await getLeadsService(
      page,
      limit,
    );

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch leads',
    });
  }
};