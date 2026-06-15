"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeadsService = exports.createLeadService = void 0;
const prisma_1 = require("../config/prisma");
const createLeadService = async (data) => {
    return prisma_1.prisma.lead.create({
        data,
    });
};
exports.createLeadService = createLeadService;
const getLeadsService = async () => {
    return prisma_1.prisma.lead.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getLeadsService = getLeadsService;
//# sourceMappingURL=lead.service.js.map