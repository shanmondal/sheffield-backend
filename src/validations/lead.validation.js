"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeadSchema = void 0;
const zod_1 = require("zod");
exports.createLeadSchema = zod_1.z.object({
    type: zod_1.z.string().min(1),
    name: zod_1.z.string().min(2),
    email: zod_1.z.email(),
    message: zod_1.z.string().min(5),
    company: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    subject: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
});
//# sourceMappingURL=lead.validation.js.map