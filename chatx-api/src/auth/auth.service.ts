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

  comparePasswords(
    newPassword: string,
    passwordHash: string,
  ): Observable<any | boolean> {
    return of<any | boolean>(bcrypt.compare(newPassword, passwordHash));
  }

  async validateUser(login: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.getUserByLogin(login);

    if (user && this.comparePasswords(password, user.password)) {
      const {...all} = user;
      return all;
    }
    return null;
  }
}
