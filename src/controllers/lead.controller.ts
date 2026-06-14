import { Request, Response } from "express";
import { createLeadService } from "../services/lead.service";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await createLeadService(req.body);

    return res.status(201).json(lead);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create lead",
    });
  }
};