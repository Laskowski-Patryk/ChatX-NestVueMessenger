import * as mongoose from 'mongoose';
import { MessageDto } from '../dtos/message.dto';
var uniqueValidator = require('mongoose-unique-validator');

export const MessageSchema = new mongoose.Schema(
  {
    id_user: String,
    id_conversation: String,
    message: String,
    send_date: {type: Date, default: Date.now()+(2*60*60*1000)},
  },
  { versionKey: false }, // aby nie zwracał niepotrzebnych danych
);
MessageSchema.plugin(uniqueValidator);
export const Message = mongoose.model<MessageDto>('Message', MessageSchema);
export default Message;
