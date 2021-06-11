import * as mongoose from 'mongoose';
import { UserDto } from '../dtos/user.dto';
// var uniqueValidator = require('mongoose-unique-validator');

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    password_hash: String,
    email_verified: Boolean,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    avatar: String,
    public_key: { type: String, dropDups: true, unique: true },
    private_key: { type: String, dropDups: true, unique: true },
    created_at: {type: Date, default: Date.now()+(2*60*60*1000)},
  },
  { versionKey: false }, // aby nie zwracał niepotrzebnych danych
);


export const User = mongoose.model<UserDto>('User', UserSchema);
export default User;
