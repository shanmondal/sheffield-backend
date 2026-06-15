import { CreateLeadDto } from "../types/lead.type";
export declare const createLeadService: (data: CreateLeadDto) => Promise<{
    type: string;
    name: string;
    company: string | null;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    source: string | null;
    status: string;
    createdAt: Date;
    id: number;
}>;
export declare const getLeadsService: () => Promise<{
    type: string;
    name: string;
    company: string | null;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    source: string | null;
    status: string;
    createdAt: Date;
    id: number;
}[]>;
//# sourceMappingURL=lead.service.d.ts.map