import {
  Controller,
  Post,
  Headers,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageDto } from '../dtos/message.dto';
import { MessageService } from './message.service';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('scrollLoad')
  public scrollLoad(@Request() req): Promise<MessageDto[]> {
    return this.messageService.scrollLoad(
      req.body.conversation,
      req.body.messagesToLoad,
      req.body.alreadyLoaded,
    ); // (req.user, ile zaladowac, ile już załadowanych)
  }
 
  @Post('loadAll')
  public loadAll(@Request() req, @Headers() headers): Promise<MessageDto[]> {
    return this.messageService.loadAll(
      headers.user,
      req.body.messagesToLoad,
      req.body.conversationsToLoad,
      req.body.alreadyLoaded,
    ); // (req.user, ile zaladowac, ile już załadowanych)
  }

  @Post('send')
  public send(@Request() req) {
    return this.messageService.send(req.body.msg, req.user, req.body.user2);
  }

  @Post('makeasseen')
  public makeasseen(@Request() req) {
    return this.messageService.makeasseen(req.body.msgID);
  }
}
