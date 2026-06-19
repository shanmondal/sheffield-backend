import { Request, Response } from 'express';
import ExcelJS from 'exceljs';

import {
  createLeadService,
  getLeadsService,
  getLeadStatsService,
  getAllLeadsForExport,
  getLeadByIdService,
} from '../services/lead.service';
import { createLeadSchema } from '../validations/lead.validation';
import { sendMailToQueue } from '../services/mail-queue.service';

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

    sendMailToQueue({
      name: lead.name,
      email: lead.email,
      company: lead.company ?? undefined,
      phone: lead.phone ?? undefined,
      subject: lead.subject ?? undefined,
      message: lead.message,
      type: lead.type,
    }).catch((error) => {
      console.error('Failed to push mail to SQS:', error);
    });

    return res.status(201).json(lead);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to create lead',
    });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const search = typeof req.query.search === 'string' ? req.query.search : '';
    const startDate =
      typeof req.query.startDate === 'string' ? req.query.startDate : undefined;

    const endDate =
      typeof req.query.endDate === 'string' ? req.query.endDate : undefined;
    const result = await getLeadsService(
      page,
      limit,
      search,
      startDate,
      endDate,
    );

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch leads',
    });
  }
};

export const getLeadStats = async (req: Request, res: Response) => {
  try {
    const stats = await getLeadStatsService();

    return res.json(stats);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch stats',
    });
  }
};

export const exportLeads = async (req: Request, res: Response) => {
  try {
    const search =
      typeof req.query.search === 'string' ? req.query.search : undefined;

    const startDate =
      typeof req.query.startDate === 'string' ? req.query.startDate : undefined;

    const endDate =
      typeof req.query.endDate === 'string' ? req.query.endDate : undefined;

    const leads = await getAllLeadsForExport(search, startDate, endDate);

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('Leads');

    worksheet.columns = [
      {
        header: 'Date',
        key: 'date',
        width: 20,
      },
      {
        header: 'Type',
        key: 'type',
        width: 15,
      },
      {
        header: 'Name',
        key: 'name',
        width: 25,
      },
      {
        header: 'Company',
        key: 'company',
        width: 25,
      },
      {
        header: 'Email',
        key: 'email',
        width: 30,
      },
      {
        header: 'Phone',
        key: 'phone',
        width: 20,
      },
      {
        header: 'Subject',
        key: 'subject',
        width: 40,
      },
      {
        header: 'Message',
        key: 'message',
        width: 60,
      },
      {
        header: 'Status',
        key: 'status',
        width: 15,
      },
    ];

    leads.forEach((lead) => {
      worksheet.addRow({
        date: lead.createdAt.toLocaleString(),
        type: lead.type,
        name: lead.name,
        company: lead.company ?? '',
        email: lead.email,
        phone: lead.phone ?? '',
        subject: lead.subject ?? '',
        message: lead.message,
        status: lead.status,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader('Content-Disposition', `attachment; filename=leads.xlsx`);

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Export failed',
    });
  }
};



export const getLeadById = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const lead =
      await getLeadByIdService(id);

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      });
    }

    return res.json(lead);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Failed to fetch lead',
    });
  }
};