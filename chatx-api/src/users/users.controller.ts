import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }

}
