import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async comparePasswords(newPassword: string, passwordHash: string): Promise<any> {
    const match = await bcrypt.compare(newPassword, passwordHash);
    
    return match;

  }

  async validateUser(username: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && await this.comparePasswords(password, user.password)) {
      const {password,private_key, ...all } = user._doc;

      return all;
    }
    return null;
  }

  async login(user: UserDto){

    const payload = {name: user.name, sub: user._id}
    return{
      access_token: this.jwtService.sign(payload),
    }

  }


  async email(user: UserDto){
    const payload = {name: user.name, sub: user._id}
    return{
      access_token: this.jwtService.sign(payload),
    }
  }
}
