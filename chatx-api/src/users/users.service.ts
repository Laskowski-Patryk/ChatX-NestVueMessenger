import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { UserDto } from '../dtos/user.dto';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public hashPassword(password: string): Observable<string> {
    return from<string>(bcrypt.hash(password, 12));
  }

  public getUsers(): Observable<UserDto[]> {
    return from(this.userModel.find()).pipe(
      map((users: UserDto[]) => {
        users.forEach(function (v) {
          v.password = undefined;
          v.private_key = undefined;
        });
        return users;
      }),
    );
  }

  public async postUser(newUser: UserDto) {
    return this.hashPassword(newUser.password).pipe(
      switchMap((passwordHash: string) => {
        const usr = new UserDto();
        usr.name = newUser.name;
        usr.username = newUser.username;
        usr.email = newUser.email;
        usr.city = newUser.city;
        usr.avatar = newUser.avatar;
        usr.private_key = randomHash(20, 0);
        usr.public_key = randomHash(20, 0);
        usr.surname = newUser.surname;
        usr.password = passwordHash;

        const user = new this.userModel(usr);

        return from(user.save()).pipe(
          map((user: IUser) => {
            const { password, ...result } = user;
            return {msg: "good"};
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }

  public async getUserByusername(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }

  public async getUserById(id: number): Promise<any> {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user || !user[0]) {
      throw new HttpException('Not Found', 404);
    }
    return { ...user };
  }

  public async deleteUserById(id: number): Promise<any> {
    const user = await this.userModel.deleteOne({ id }).exec();
    if (user.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return { ...user };
  }

  public async updateUserById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<UserDto> {
    const user = await this.userModel
      .findOneAndUpdate({ id }, { [propertyName]: propertyValue })
      .exec();
    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return { ...user };
  }
}

function randomHash(length, current) {
  current = current ? current : '';
  return length
    ? randomHash(
        --length,
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.charAt(
          Math.floor(Math.random() * 60),
        ) + current,
      )
    : current;
}
