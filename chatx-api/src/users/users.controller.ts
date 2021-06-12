import { Body, Controller, Get,Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  public getUsers() {
    console.log("siema");
    return this.userService.getUsers();
  } 

  @Get('confirmation/:token')
  public emailVerified(@Request() req) {
    return this.userService.emailVerified(req.params.token);
  } 

  @Post('register')
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }
}
