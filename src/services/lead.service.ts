import { prisma } from '../config/prisma';
import { CreateLeadDto } from '../types/lead.type';

const buildLeadWhereClause = (
  search?: string,
  startDate?: string,
  endDate?: string,
) => {
  const where: any = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        company: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        subject: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];
  }

  if (startDate || endDate) {
    where.createdAt = {};

    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }

    if (endDate) {
      const end = new Date(endDate);

      end.setHours(23, 59, 59, 999);

      where.createdAt.lte = end;
    }
  }

  return where;
};

export const createLeadService = async (
  data: CreateLeadDto,
) => {
  return prisma.lead.create({
    data,
  });
};

export const getLeadsService = async (
  page: number,
  limit: number,
  search?: string,
  startDate?: string,
  endDate?: string,
) => {
  const skip = (page - 1) * limit;

  const where = buildLeadWhereClause(
    search,
    startDate,
    endDate,
  );

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),

    prisma.lead.count({
      where,
    }),
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

export const getLeadStatsService = async (
  search?: string,
  startDate?: string,
  endDate?: string,
) => {
  const where = buildLeadWhereClause(
    search,
    startDate,
    endDate,
  );

  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const startOfWeek = new Date(startOfToday);

  startOfWeek.setDate(
    startOfToday.getDate() - startOfToday.getDay(),
  );

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  );

  const [total, today, thisWeek, thisMonth] =
    await Promise.all([
      prisma.lead.count({
        where,
      }),

      prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfToday,
          },
        },
      }),

      prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfWeek,
          },
        },
      }),

      prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
    ]);

  return {
    total,
    today,
    thisWeek,
    thisMonth,
  };
};

export const getAllLeadsForExport = async (
  search?: string,
  startDate?: string,
  endDate?: string,
) => {
  const where = buildLeadWhereClause(
    search,
    startDate,
    endDate,
  );

  return prisma.lead.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
  });
};



export const getLeadByIdService = async (
  id: number,
) => {
  return prisma.lead.findUnique({
    where: {
      id,
    },
  });
};