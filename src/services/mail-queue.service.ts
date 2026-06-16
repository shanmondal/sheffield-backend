import crypto from 'crypto';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqs = new SQSClient({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.SQS_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SQS_AWS_SECRET_ACCESS_KEY as string,
  },
});

type MailPayload = {
  name: string;
  email: string;
  company?: string | undefined;
  phone?: string | undefined;
  subject?: string | undefined;
  message: string;
  type: string;
};

export const sendMailToQueue = async (data: MailPayload) => {
  const payload = {
    to: [process.env.LEAD_RECEIVER_EMAIL],
    subject: `New ${data.type} Request`,
    body: `
      <h2>Sheffield Website Enquiry</h2>

      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company || '-'}</p>
      <p><strong>Phone:</strong> ${data.phone || '-'}</p>
      <p><strong>Subject:</strong> ${data.subject || '-'}</p>

      <hr />

      <p>${data.message}</p>
    `,
    worker_id: null,
  };

  const response = await sqs.send(
    new SendMessageCommand({
      QueueUrl: process.env.MAIL_SQS_URL as string,
      MessageBody: JSON.stringify(payload),
      MessageGroupId: 'outlook-mail-group',
      MessageDeduplicationId: crypto.randomUUID(),
    }),
  );

  console.log(`SQS Message Sent: ${response.MessageId}`);

  return response;
};
