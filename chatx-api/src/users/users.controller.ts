import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  public getUsers() {
    return this.userService.getUsers();
  }

  @Post('verifyToken')
  public verifyToken(@Request() req) {
    return this.userService.verifyToken(req.body);
  }

  @Post('forgotPassword')
  public forgotPassword(@Request() req) {
    return this.userService.forgotPassword(req.body.email);
  }

  @Post('changePassword')
  public changePassword(@Request() req) {
    return this.userService.changePassword(req.body);
  }

  @Get('confirmation/:token')
  @Redirect()
  public async emailVerified(@Request() req) {
    let x = await this.userService.emailVerified(req.params.token);
    return { url: `http://localhost:8080/signin/${x.msg}` };
  }

  @Post('register')
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }
}
