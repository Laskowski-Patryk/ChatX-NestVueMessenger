import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { UserDto } from '../dtos/user.dto';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private authService: AuthService
    
    ) {}

  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();
    if (!users || !users[0]) {
      throw new HttpException('Not Found', 404);
    }
    return [...users];
  }

  public async postUser(newUser: UserDto) {

    return this.authService.hashPassword(newUser.password).pipe(
      switchMap((passwordHash: string) => {
          const usr = new UserDto();
          usr.name = newUser.name;
          usr.login = newUser.login;
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
                  const {password, ...result} = user;
                  return result;
              }),
              catchError(err => throwError(err))
          )
      })
  )


    // newUser.email_verified = false;
    // newUser.private_key = randomHash(20, 0);
    // newUser.public_key = randomHash(20, 0);

    // console.log(this.authService.hashPassword(newUser.password));

    // const user = await new this.userModel(newUser);
    // return user.save();


  }

  public async getUserById(id: number): Promise<UserDto> {

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
