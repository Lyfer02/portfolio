import type { Request, Response } from 'express';
import { saveContactMessage } from '../services/contactService';
import type { ContactInput } from '../schemas/contact';

export function postContact(req: Request, res: Response) {
  try {
    const payload = req.body as ContactInput;
    const record = saveContactMessage(payload);

    return res.status(201).json({
      success: true,
      message: 'Thanks for reaching out. I will get back to you soon.',
      data: {
        id: record.id,
        receivedAt: record.receivedAt,
      },
    });
  } catch (error) {
    console.error('[contact] Failed to process message:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
    });
  }
}
