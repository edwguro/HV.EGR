import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Environment } from '../../config/environment';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { EmailProvider } from './email/email-provider';
import { NoopEmailProvider } from './email/noop-email.provider';
import { ResendEmailProvider } from './email/resend-email.provider';

@Module({
  controllers: [ContactController],
  providers: [
    ContactService,
    {
      provide: EmailProvider,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Environment, true>): EmailProvider => {
        const apiKey = config.get('RESEND_API_KEY', { infer: true });
        const from = config.get('EMAIL_FROM', { infer: true });
        const to = config.get('CONTACT_NOTIFICATION_TO', { infer: true });

        if (!apiKey || apiKey.startsWith('replace-') || !from || !to) {
          return new NoopEmailProvider();
        }

        return new ResendEmailProvider(apiKey, from, to);
      },
    },
  ],
})
export class ContactModule {}
