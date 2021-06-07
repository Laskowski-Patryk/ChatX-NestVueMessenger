import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';
export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  emai_verified: Boolean,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  city: { type: String, required: true },
  avatar: String
});
export const User = mongoose.model<IUser>('User', UserSchema);
export default User;

