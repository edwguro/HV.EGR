import type { ContactEmail } from './email-provider';
import { EmailProvider } from './email-provider';

export class ResendEmailProvider extends EmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
    private readonly to: string,
  ) {
    super();
  }

  async sendContactNotification(contact: ContactEmail): Promise<void> {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: this.from,
        to: [this.to],
        subject: `Nuevo contacto desde el portafolio: ${contact.subject}`,
        text: [
          `Nombre: ${contact.name}`,
          `Correo: ${contact.email}`,
          `Empresa: ${contact.company ?? 'No indicada'}`,
          '',
          contact.message,
        ].join('\n'),
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      throw new Error(`Email provider returned status ${response.status}.`);
    }
  }
}
