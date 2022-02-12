import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export class UserDto {
  _id?: string;
  @ApiProperty({type: String, description: 'Username'})
  @IsNotEmpty() @IsAlphanumeric() @MinLength(3) @MaxLength(20) username: string;
  @ApiProperty({type: String, description: 'Password'})
  @IsNotEmpty() @MinLength(5) @MaxLength(20) password: string;
  password_hash?: string;
  @ApiProperty({type: String, description: 'Email'})
  @IsEmail() email: string;
  email_verified?: Boolean = false;
  @ApiProperty({type: String, description: 'Name'})
  @IsNotEmpty() @IsAlphanumeric() @MaxLength(20) name: string;
  @ApiProperty({type: String, description: 'Surname'})
  @IsNotEmpty() @IsAlphanumeric() @MaxLength(40) surname: string;
  @ApiProperty({type: String, description: 'City'})
  @IsNotEmpty() @IsAlphanumeric() city: string;
  avatar?: string;
  created_at?: any;
  private_key: string;
  public_key: string;
  password_reset?: boolean;
  permission?: number;
  banned?: boolean;
  deleted?: boolean;
}
