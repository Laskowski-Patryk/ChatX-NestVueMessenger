import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConversationDto } from '../dtos/conversation.dto';
import { ConversationService } from './conversation.service';

@UseGuards(JwtAuthGuard)
@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Get('get')
  public getConversations() {
      return this.conversationService.getConversations();
  }

  @Post('create')
  public createConversation(@Body() conversationService: ConversationDto) {
    //   return this.userService.postUser(user);
  }

  @Post('setName')
  public setName(@Body() conversationService: ConversationDto) {
    //   return this.userService.postUser(user);
  }
}
