"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLeadNotification = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendLeadNotification = async (data) => {
    await exports.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New ${data.type} Request`,
        html: `
      <h2>New Website Enquiry</h2>

      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || "-"}</p>
      <p><strong>Phone:</strong> ${data.phone || "-"}</p>
      <p><strong>Subject:</strong> ${data.subject || "-"}</p>

      <hr />

      <p>${data.message}</p>
    `,
    });
};
exports.sendLeadNotification = sendLeadNotification;
//# sourceMappingURL=email.service.js.map