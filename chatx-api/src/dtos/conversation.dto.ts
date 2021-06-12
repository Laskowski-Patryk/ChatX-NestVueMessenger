export class ConversationDto {
  _id?: string;
  name: string;
  id_users: { user: String, user2: String };
  id_conversation: string;
  create_date: any;
}
