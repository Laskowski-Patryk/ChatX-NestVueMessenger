import { IsAlphanumeric, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export class UserDto {
  _id?: string;
  @IsNotEmpty() @IsAlphanumeric() @MinLength(3) @MaxLength(20) username: string;
  @IsNotEmpty() @MinLength(5) @MaxLength(20) password: string;
  password_hash?: string;
  @IsEmail() email: string;
  email_verified?: Boolean = false;
  @IsNotEmpty() @IsAlphanumeric() @MaxLength(20) name: string;
  @IsNotEmpty() @IsAlphanumeric() @MaxLength(40) surname: string;
  @IsNotEmpty() @IsAlphanumeric() city: string;
  avatar?: string;
  public_key?: string;
  private_key?: string;
  created_at?: any;
  password_reset?: boolean;
}
