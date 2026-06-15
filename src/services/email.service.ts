import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Error:', error);
  } else {
    console.log('SMTP Ready');
  }
});
export const sendLeadNotification = async (data: {
  name: string;
  email: string;
  company?: string | undefined;
  phone?: string | undefined;
  subject?: string | undefined;
  message: string;
  type: string;
}) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New ${data.type} Request`,
    html: `
      <h2>New Website Enquiry</h2>

      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || '-'}</p>
      <p><strong>Phone:</strong> ${data.phone || '-'}</p>
      <p><strong>Subject:</strong> ${data.subject || '-'}</p>

      <hr />

      <p>${data.message}</p>
    `,
  });
};
