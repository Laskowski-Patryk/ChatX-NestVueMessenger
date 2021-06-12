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
        "id_users.user": user,
        "id_users.user2": user2

      })
      .exec();
    return conversation;
  }

  public async getAllConversations(id_user) {
    const all = await this.conversationModel.find({ id_users: id_user }).exec();
    return all;
  }

  public async createConversation(id_user, id_user2): Promise<ConversationDto> {
    const conv = new ConversationDto();
    const conversation = new this.conversationModel(conv);
    const obj = {user: id_user, user2: id_user2}
    conversation.id_users = obj;
    conversation.create_date = Date.now()+(2*60*60*1000);
    conversation.save().catch((err) => {
      throw new HttpException("Can't create conversation", 400);
    });

    return conversation;
  }
}
