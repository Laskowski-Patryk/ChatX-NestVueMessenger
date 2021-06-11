import * as mongoose from 'mongoose';
import { UserDto } from '../dtos/user.dto';
var uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true);

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true,unique: true, dropDups: true},
    username: { type: String, required: true,unique: true, dropDups: true },
    password: { type: String, required: true },
    password_hash: String,
    email_verified: Boolean,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    avatar: String,
    public_key: { type: String, dropDups: true, unique: true },
    private_key: { type: String, dropDups: true, unique: true },
  },
  { versionKey: false },
);
UserSchema.plugin(uniqueValidator);
export const User = mongoose.model<UserDto>('User', UserSchema);
export default User;
