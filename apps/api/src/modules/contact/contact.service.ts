import { Injectable, Logger } from '@nestjs/common';
import type { ContactResponse } from '@portfolio/contracts';
import { PrismaService } from '../../database/prisma.service';
import type { CreateContactDto } from './dto/create-contact.dto';
import { EmailProvider } from './email/email-provider';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailProvider: EmailProvider,
  ) {}

  async create(input: CreateContactDto): Promise<ContactResponse> {
    if (input.website) {
      return { accepted: true };
    }

    const contact = {
      company: input.company,
      email: input.email.toLowerCase(),
      message: input.message,
      name: input.name,
      subject: input.subject,
    };

    await this.prisma.contactMessage.create({ data: contact });
    try {
      await this.emailProvider.sendContactNotification(contact);
    } catch {
      this.logger.warn('Contact notification delivery failed.');
    }

    return { accepted: true };
  }
}
