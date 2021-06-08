import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly _id?: string;
  readonly username: string;
  readonly password: string;
  readonly password_hash?: string;
  readonly email: string;
  readonly email_verified?: Boolean;
  readonly name: string;
  readonly surname: string;
  readonly city: string;
  readonly avatar?: string;
  readonly public_key?: string;
  readonly private_key?: string;
}
