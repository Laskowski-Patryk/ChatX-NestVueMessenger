import { IsEmail, IsNotEmpty } from 'class-validator';


export class UserDto {
  _id?: string;
  username: string;
  password: string;
  password_hash?: string;
  @IsEmail() email: string;
  email_verified?: Boolean = false;
  name: string;
  surname: string;
  city: string;
  avatar?: string;
  public_key?: string;
  private_key?: string;
}
