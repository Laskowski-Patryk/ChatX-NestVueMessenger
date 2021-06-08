import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public getUsers() {
    return this.userService.getUsers();
  }

  @Post('register')
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }
}
