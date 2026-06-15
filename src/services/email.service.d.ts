import nodemailer from "nodemailer";
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
export declare const sendLeadNotification: (data: {
    name: string;
    email: string;
    company?: string | undefined;
    phone?: string | undefined;
    subject?: string | undefined;
    message: string;
    type: string;
}) => Promise<void>;
//# sourceMappingURL=email.service.d.ts.map