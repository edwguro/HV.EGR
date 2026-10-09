import { Body, Controller, Post } from '@nestjs/common';
import type { ContactResponse } from '@portfolio/contracts';
import { minutes, Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: minutes(10) } })
  create(@Body() input: CreateContactDto): Promise<ContactResponse> {
    return this.contactService.create(input);
  }
}
