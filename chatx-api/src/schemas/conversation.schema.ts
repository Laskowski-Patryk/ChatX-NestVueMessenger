import * as mongoose from 'mongoose';
import { ConversationDto } from '../dtos/conversation.dto';
export const ConversationSchema = new mongoose.Schema(
  {
    created_at: {type: Date, default: Date.now()+(2*60*60*1000)},
    name: String,
    id_users: { user: String, user2: String }
  },
  { versionKey: false }, // aby nie zwracał niepotrzebnych danych
);
export const Conversation = mongoose.model<ConversationDto>(
  'Conversation',
  ConversationSchema,
);
export default Conversation;
