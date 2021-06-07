import { Schema, model, connect } from 'mongoose';

interface User {
  _id?: string,
  login: string,
  password: string,
  email: string,
  emai_verified?: Boolean,
  name: string,
  surname: string,
  city: string,
  avatar?: string,
  public_key?: string,
  private_key?: string
}

const schema = new Schema<User>({
  email: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  emai_verified: Boolean,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  city: { type: String, required: true },
  avatar: String
});

const UserModel = model<User>('User', schema);

run().catch((err) => console.log(err));

async function run(): Promise<void> {
  await connect(
    'mongodb+srv://lasek:lasek123@cluster0.8f7wo.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  const doc = new UserModel({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
  });
  await doc.save();

  console.log(doc.email); // 'bill@initech.com'
}
