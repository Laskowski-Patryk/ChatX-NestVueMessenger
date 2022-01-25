import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Redirect,
  Param
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('getProfile')
  public getUsers(@Body() body) {
    console.log(body.text)
    return this.userService.getUsers(body.text);
  }

  @Post('register')
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }

  @Post('updateUser')
  public updateUser(@Request() req) {
    console.log(req.headers.user)
    return this.userService.updateUser(req.headers.user,req.body);
  }

  @Get('profile')
  public getUserById(@Request() req) {
    return this.userService.getUserById(req.headers.user);
  }
}
