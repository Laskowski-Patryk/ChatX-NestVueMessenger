import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConversationDto } from '../dtos/conversation.dto';
import { Model } from 'mongoose';
@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<ConversationDto>,
  ) {}

  public async getConversationId(user, user2) {
    const conversation = await this.conversationModel
      .findOne({ id_users: [ user, user2 ] })
      .exec();
    return conversation;
  }
  public async getConversations() {
    const message = await this.conversationModel.find().exec();
    console.log(message);
    return message;
  }
}
