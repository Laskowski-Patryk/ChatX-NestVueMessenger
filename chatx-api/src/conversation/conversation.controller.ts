import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConversationDto } from '../dtos/conversation.dto';
import { ConversationService } from './conversation.service';

@UseGuards(JwtAuthGuard)
@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

}
