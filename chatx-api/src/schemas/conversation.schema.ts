import * as mongoose from 'mongoose';
import { ConversationDto } from '../dtos/conversation.dto';
var uniqueValidator = require('mongoose-unique-validator');

export const ConversationSchema = new mongoose.Schema(
  {
    created_at: {type: Date, default: Date.now()+(2*60*60*1000)},
    name: String,
  },
  { versionKey: false }, // aby nie zwracał niepotrzebnych danych
);
ConversationSchema.plugin(uniqueValidator);
export const Conversation = mongoose.model<ConversationDto>(
  'Conversation',
  ConversationSchema,
);
export default Conversation;
