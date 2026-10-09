import { Body, Controller, Post } from '@nestjs/common';
import type { AiChatResponse } from '@portfolio/contracts';
import { minutes, Throttle } from '@nestjs/throttler';
import { AiService } from './ai.service';
import { AiChatDto } from './dto/ai-chat.dto';

@Controller('ai/chat')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  @Throttle({ default: { limit: 10, ttl: minutes(1) } })
  chat(@Body() input: AiChatDto): Promise<AiChatResponse> {
    return this.aiService.chat(input.message);
  }
}
