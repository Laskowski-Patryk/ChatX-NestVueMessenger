import { Body, Controller, Get,Request, Post, UseGuards, Redirect } from '@nestjs/common';
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
  @Redirect()
  public async emailVerified(@Request() req) {
    let x = await this.userService.emailVerified(req.params.token);
    return {url: `http://localhost:8080/signin/${x.msg}`}
    
  } 

  @Post('register')
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }
}
