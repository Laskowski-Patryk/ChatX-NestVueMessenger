import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';
export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, dropDups: true },
    username: { type: String, required: true, dropDups: true },
    password: { type: String, required: true },
    password_hash: String,
    email_verified: Boolean,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    avatar: String,
    public_key: { type: String, dropDups: true },
    private_key: { type: String, dropDups: true },
  },
  { versionKey: false },
);
export const User = mongoose.model<IUser>('User', UserSchema);
export default User;
