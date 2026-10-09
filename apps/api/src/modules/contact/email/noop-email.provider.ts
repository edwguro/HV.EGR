import { Injectable } from '@nestjs/common';
import { EmailProvider } from './email-provider';

@Injectable()
export class NoopEmailProvider extends EmailProvider {
  sendContactNotification(): Promise<void> {
    return Promise.resolve();
  }
}
