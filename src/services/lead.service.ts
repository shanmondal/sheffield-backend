import { prisma } from "../config/prisma";
import { CreateLeadDto } from "../types/lead.type";

export const createLeadService = async (
  data: CreateLeadDto
) => {
  return prisma.lead.create({
    data,
  });
};

export const getLeadsService = async () => {
  return prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};