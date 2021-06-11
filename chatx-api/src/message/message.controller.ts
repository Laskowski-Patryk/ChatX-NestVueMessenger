import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageDto } from '../dtos/message.dto';
import { MessageService } from './message.service';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('loadMessages')
  public loadMessages(@Request() req) {
    return this.messageService.loadMessages(req.user, req.body.user2, 4); // (req.user, ile zaladowac)
  }

  @Get('loadMore')
  public loadMore(@Request() req) {
    return this.messageService.loadMore(req.user, 4, 4); // (req.user, ile zaladowac, ile już załadowanych)
  }

  // @Post('send')
  // public sendMessage(@Body() messageService: MessageDto) {
  //   //   return this.userService.postUser(user);
  // }
}
