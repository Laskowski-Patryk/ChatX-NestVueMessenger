import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Redirect,
} from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('confirmation/:token')
  @Redirect()
  public async emailVerified(@Request() req) {
    let x = await this.mailerService.emailVerified(req.params.token);
    return { url: `http://localhost:8080/signin/${x.msg}` };
  }

  @Post('changePassword')
  public changePassword(@Request() req) {
    return this.mailerService.changePassword(req.body);
  }

  @Post('forgotPassword')
  public forgotPassword(@Request() req) {
    return this.mailerService.forgotPassword(req.body.email);
  }
  
  @Post('verifyToken')
  public verifyToken(@Request() req) {
    return this.mailerService.verifyToken(req.body);
  }

}
