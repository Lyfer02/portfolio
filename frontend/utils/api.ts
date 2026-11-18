import { SITE } from '../constants/content';
import type { ContactFormValues } from '../types';

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: { path: string; message: string }[];
};

export async function submitContact(
  values: ContactFormValues
): Promise<ApiResponse<{ id: string; receivedAt: string }>> {
  const response = await fetch(`${SITE.apiBaseUrl}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(values),
  });

  const payload = (await response.json()) as ApiResponse<{
    id: string;
    receivedAt: string;
  }>;

  if (!response.ok) {
    throw Object.assign(new Error(payload.message || 'Request failed'), {
      status: response.status,
      errors: payload.errors,
    });
  }

  return payload;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${SITE.apiBaseUrl}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
