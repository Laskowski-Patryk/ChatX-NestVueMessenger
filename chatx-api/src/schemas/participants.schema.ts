import * as mongoose from 'mongoose';
import { ParticipantsDto } from '../dtos/participants.dto';
var uniqueValidator = require('mongoose-unique-validator');

export const ParticipantsSchema = new mongoose.Schema(
  {
    id_users: { 0: String, 1: String },
    id_conversation: String,
  },
  { versionKey: false }, // aby nie zwracał niepotrzebnych danych
);
ParticipantsSchema.plugin(uniqueValidator);
export const Participants = mongoose.model<ParticipantsDto>(
  'Participants',
  ParticipantsSchema,
);
export default Participants;
