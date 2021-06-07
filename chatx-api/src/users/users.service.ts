import { HttpException, Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes } from 'crypto';
import { promisify } from 'util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { UserDto } from '../dtos/user.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  private users: IUser[] = [];
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();
    if (!users || !users[0]) {
      throw new HttpException('Not Found', 404);
    }
    return [...users];
  }

  public async postUser(newUser: UserDto) {
    newUser.email_verified = false;
    newUser.private_key = randomHash(20, 0);
    newUser.public_key = randomHash(20, 0);

    // TODO HASHING PASSWORDS

    const user = await new this.userModel(newUser);
    return user.save();
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
