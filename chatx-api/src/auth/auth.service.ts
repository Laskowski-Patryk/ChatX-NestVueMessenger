import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { UserDto } from '../dtos/user.dto';
import { IUser } from '../interfaces/user.interface';
import { UsersService } from '../users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  generateJWT(user: IUser): Observable<string> {
    return from(this.jwtService.signAsync({ user })); // https://www.youtube.com/watch?v=bbDDSylRM04
  }

  async comparePasswords(newPassword: string, passwordHash: string): Promise<any> {
    const match = await bcrypt.compare(newPassword, passwordHash);
    
    return match;

  }

  async validateUser(login: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.getUserByLogin(login);
    if (user && await this.comparePasswords(password, user.password)) {
      const {password,private_key, ...all } = user._doc;

      return all;
    }
    return null;
  }
}
