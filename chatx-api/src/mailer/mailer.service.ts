import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../users/users.service';

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public async verifyToken(token) {
    let secret = process.env.EMAIL_SECRET;
    let id;
    try {
      id = jwt.verify(token[0], secret);

      let usr = await this.userService.getUserById(id.sub);
      if (usr.password_reset == false) return { msg: 'wrong' };
    } catch (err) {
      return { msg: 'wrong' };
    }

    return { msg: 'good' };
  }

  public async changePassword(user) {
    let secret = process.env.EMAIL_SECRET;
    let id;
    try {
      id = jwt.verify(user.token, secret);
      await this.userService.updateUserById(id.sub, 'password_reset', 'false');
      let newPass = await bcrypt.hash(user.password, 12);
      await this.userService.updateUserById(id.sub, 'password', newPass);
    } catch (err) {
      return { msg: 'wrong' };
    }

    return { msg: 'good' };
  }

  public async forgotPassword(email) {
    let user = await this.userService.getUserByEmail(email); // @ts-ignore: Unreachable code error
    if (user.password_reset == true) return { msg: 'error' };
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        type: 'login',
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    }); // @ts-ignore: Unreachable code error
    const payload = { name: user.name, sub: user._id };
    let emailToken = jwt.sign(payload, process.env.EMAIL_SECRET);

    const url = `http://localhost:8080/RecoverPassword/${emailToken}`;
    transporter.sendMail({
      from: '"ChatX App" <chatxautomailer@gmail.com>', // @ts-ignore: Unreachable code error
      to: user.email,
      subject: 'Reset your password', // @ts-ignore: Unreachable code error
      html: `Hello ${user.name}!\n<br> Seems like you forgot your password.<br>Click link below to reset. <br><a href="${url}">${url}</a>`,
    });
    this.userService.updateUserById(user._id, 'password_reset', 'true');
    return { msg: 'sent' };
  }

  public async emailVerified(token) {
    let secret = process.env.EMAIL_SECRET;
    let id;
    try {
      id = jwt.verify(token, secret);
    } catch (err) {
      return { msg: 'wrong' };
    }
    this.userService.updateUserById(id.sub, 'email_verified', 'true');
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
      html: `Hello ${user.name}!<br> Please click this link to confirm your email: <br><a href="${url}">${url}</a>`,
    });
  }
}
