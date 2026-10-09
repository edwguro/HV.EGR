export interface ContactEmail {
  company?: string;
  email: string;
  message: string;
  name: string;
  subject: string;
}

export abstract class EmailProvider {
  abstract sendContactNotification(contact: ContactEmail): Promise<void>;
}
