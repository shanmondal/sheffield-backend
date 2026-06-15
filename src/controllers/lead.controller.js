"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeads = exports.createLead = void 0;
const lead_service_1 = require("../services/lead.service");
const lead_validation_1 = require("../validations/lead.validation");
const email_service_1 = require("../services/email.service");
const createLead = async (req, res) => {
    try {
        const validation = lead_validation_1.createLeadSchema.safeParse(req.body);
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
        const lead = await (0, lead_service_1.createLeadService)(req.body);
        await (0, email_service_1.sendLeadNotification)({
            name: lead.name,
            email: lead.email,
            company: lead.company ?? undefined,
            phone: lead.phone ?? undefined,
            subject: lead.subject ?? undefined,
            message: lead.message,
            type: lead.type,
        });
        return res.status(201).json(lead);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to create lead',
        });
    }
};
exports.createLead = createLead;
const getLeads = async (_req, res) => {
    try {
        const leads = await (0, lead_service_1.getLeadsService)();
        return res.json(leads);
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch leads',
        });
    }
};
exports.getLeads = getLeads;
//# sourceMappingURL=lead.controller.js.map