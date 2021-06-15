import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password).catch(err=>{
      throw new HttpException('Wrong username or password',403);
    });
    
    if (!user) {
      throw new HttpException('Wrong username or password',403);
    }// @ts-ignore: Unreachable code error
    if(!user._doc.email_verified) throw new HttpException('Email not confirmed!',403);// @ts-ignore: Unreachable code error
    return user._doc;
  }
}
