import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConversationDto } from '../dtos/conversation.dto';
import { Model } from 'mongoose';
@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<ConversationDto>,
  ) {}

  public async getConversationId(user, user2): Promise<ConversationDto> {
    const conversation = await this.conversationModel
      .findOne({
        $or: [
          { 'id_users.user': user, 'id_users.user2': user2 },
          { 'id_users.user': user2, 'id_users.user2': user },
        ],
      })
      .exec();
    return conversation;
  }

  public async getAllConversations(
    id_user,
    conversationsToLoad,
    alreadyLoaded,
  ): Promise<ConversationDto[]> {
    const all = await this.conversationModel
      .find({
        $or: [{ 'id_users.user': id_user }, { 'id_users.user2': id_user }],
      })
      .sort({ send_date: -1 })
      .skip(alreadyLoaded)
      .limit(conversationsToLoad)
      .exec();
    return all;
  }

  public async createConversation(id_user, id_user2): Promise<ConversationDto> {
    const conv = new ConversationDto();
    const conversation = new this.conversationModel(conv);
    const obj = { user: id_user, user2: id_user2 };
    conversation.id_users = obj;
    conversation.create_date = Date.now() + 2 * 60 * 60 * 1000;
    conversation.save().catch((err) => {
      throw new HttpException("Can't create conversation", 400);
    });

    return conversation;
  }
}
