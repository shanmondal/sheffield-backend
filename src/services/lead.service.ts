import { prisma } from "../config/prisma";
import { CreateLeadDto } from "../types/lead.type";

export const createLeadService = async (
  data: CreateLeadDto
) => {
  return prisma.lead.create({
    data,
  });
};