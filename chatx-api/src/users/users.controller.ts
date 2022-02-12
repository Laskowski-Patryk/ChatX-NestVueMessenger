import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Redirect,
  Param,
  ConsoleLogger
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from './users.service';
@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Returning profile'})
  @ApiUnauthorizedResponse({description: 'You don\'t have permission to do that'})
  @ApiBody({type: UserDto})
  @ApiBearerAuth()
  @Post('getProfile')
  public getUsers(@Body() body) {
    return this.userService.getUsers(body.text);
  }

  @ApiOkResponse({description: 'Successfully registered'})
  @ApiBody({type: UserDto})
  @Post('register')
  public postUser(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }

  @ApiOkResponse({description: 'All users returned'})
  @ApiBody({type: UserDto})
  @Get('allUsers')
  public allUsers(@Request() req) {
    
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'User Updated'})
  @ApiUnauthorizedResponse({description: 'You don\'t have permission to do that'})
  @ApiBody({type: UserDto})
  @ApiBearerAuth()
  @Post('updateUser')
  public updateUser(@Request() req) {
    return this.userService.updateUser(req.headers.user,req.body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'User Updated'})
  @ApiUnauthorizedResponse({description: 'You don\'t have permission to do that'})
  @ApiBody({type: UserDto})
  @ApiBearerAuth()
  @Post('updateUserById')
  public updateUserById(@Request() req) {
    return this.userService.updateUserById(req.body.id,req.body.name,req.body.value);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({description: 'Returning profile by id'})
  @ApiUnauthorizedResponse({description: 'You don\'t have permission to do that'})
  @ApiBody({type: UserDto})
  @ApiBearerAuth()
  @Get('profile')
  public getUserById(@Request() req) {
    return this.userService.getUserById(req.headers.user);
  }
}
