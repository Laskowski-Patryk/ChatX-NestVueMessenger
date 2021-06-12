import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageDto } from '../dtos/message.dto';
import { MessageService } from './message.service';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('scrollLoad')
  public scrollLoad(@Request() req): Promise<MessageDto[]> {
    return this.messageService.scrollLoad(req.body.conversation, 4, 0); // (req.user, ile zaladowac, ile już załadowanych)
  }

  @Get('loadAll')
  public loadAll(@Request() req): Promise<MessageDto[]> {
    return this.messageService.loadAll(req.user, 4, 4); // (req.user, ile zaladowac, ile już załadowanych)
  }

  @Post('send')
  public send(@Request() req) {
    return this.messageService.send(
      req.body.msg,
      req.user,
      req.body.user2
    );
  }
}
