import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dtos/user.dto';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
  ) {}
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
    let errors = {
      statusCode: 400,
      message: [],
      error: 'Bad Request',
    };
    return this.hashPassword(newUser.password).pipe(
      switchMap((passwordHash: string) => {
        const usr = new UserDto();
        usr.name = capitalizeFirstLetter(newUser.name);
        usr.username = newUser.username;
        usr.email = newUser.email;
        usr.city = newUser.city;
        usr.avatar = newUser.avatar;
        usr.private_key = randomHash(20, 0);
        usr.public_key = randomHash(20, 0);
        usr.surname = capitalizeFirstLetter(newUser.surname);
        usr.password = passwordHash;
        usr.created_at = Date.now() + 2 * 60 * 60 * 1000;

        const user = new this.userModel(usr);

        return from(
          user.save().catch((err) => {
            if (err.name === 'MongoError' && err.keyValue.username)
              errors.message[errors.message.length] = 'Login have to be unique';

            if (err.name === 'MongoError' && err.keyValue.email)
              errors.message[errors.message.length] = 'Email have to be unique';
            throw new HttpException(errors, 400);
          }),
        ).pipe(
          map((user: UserDto) => {
            // const { password, ...result } = user;
            this.verifyEmail(user).catch(console.error);

            return {
              msg: 'Successfully registered. Check your email to verify.',
            };
          }),

          catchError((e) => throwError(e)),
        );
      }),
    );
  }

  public async emailVerified(token) {
    let secret = process.env.EMAIL_SECRET;
    let id;
    try{
    id = jwt.verify(token, secret);
    }catch(err){
      return { msg: 'wrong' };
    }
    
    this.userModel
      .updateOne(
        { _id: id.sub },
        {
          email_verified: true,
        },
      )
      .catch((err) => {
        return { msg: 'error' };
      });
      
    return { msg: 'updated' };
  }

  public async verifyEmail(user: UserDto) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        type: 'login',
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    const payload = { name: user.name, sub: user._id };
    let emailToken = jwt.sign(payload, process.env.EMAIL_SECRET);

    const url = `http://localhost:3000/confirmation/${emailToken}`;
    transporter.sendMail({
      from: '"ChatX App" <chatxautomailer@gmail.com>', // sender address
      to: user.email,
      subject: 'Confirm Email',
      html: `Please click this link to confirm your email: </br><a href="${url}">${url}</a>`,
    });
  }

  public async getUserByUsername(username: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }

  public async getUserById(id: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return { ...user };
  }

  public async getUserByEmail(email: string): Promise<UserDto> {
    const user = await this.userModel.findOne({ email }).exec();
    console.log(user);
    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return { ...user };
  }

  public async deleteUserById(id: string): Promise<any> {
    const user = await this.userModel.deleteOne({ id }).exec();
    if (user.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return { ...user };
  }

  public async updateUserById(
    id: string,
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
