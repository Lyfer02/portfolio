import { env } from '../config/env';
import type { ContactInput } from '../schemas/contact';

export type ContactRecord = ContactInput & {
  id: string;
  receivedAt: string;
  destination: string;
};

const inbox: ContactRecord[] = [];

export function saveContactMessage(input: ContactInput): ContactRecord {
  const record: ContactRecord = {
    ...input,
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    destination: env.CONTACT_TO_EMAIL,
  };

  inbox.unshift(record);

  if (inbox.length > 100) {
    inbox.length = 100;
  }

  // In production, wire this to an email provider (Resend, SendGrid, SES).
  console.log('[contact] New message received:', {
    id: record.id,
    from: record.email,
    subject: record.subject,
    to: record.destination,
  });

  return record;
}

export function listContactMessages() {
  return inbox;
}
