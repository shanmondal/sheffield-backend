import { prisma } from '../config/prisma';
import { CreateLeadDto } from '../types/lead.type';

export const createLeadService = async (data: CreateLeadDto) => {
  return prisma.lead.create({
    data,
  });
};

export const getLeadsService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),

    prisma.lead.count(),
  ]);

  return {
    data: leads,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
