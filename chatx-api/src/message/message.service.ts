import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationService } from '../conversation/conversation.service';
import { ConversationDto } from '../dtos/conversation.dto';
import { MessageDto } from '../dtos/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<MessageDto>,
    private readonly conversationService: ConversationService
  ) {}

  public async loadMessages(
    id_user: any,
    id_user2: any,
    loadCount: number,
  ): Promise<MessageDto[]> {

    let conversation = await this.conversationService.getConversationId(id_user.id,id_user2);
    const messages = await this.messageModel
      .find({ id_conversation: conversation._id })
      .sort({ send_date: -1 })
      .limit(loadCount)
      .exec();
    // if (!messages[0]) throw new HttpException('No more messages to load', 400);
    return messages;
  }

  public async loadMore(
    id_user: any,
    loadCount: number,
    loaded: number,
  ): Promise<MessageDto[]> {
    const messages = await this.messageModel
      .find({ id_user: id_user.id })
      .sort({ send_date: -1 })
      .skip(loaded)
      .limit(loadCount)
      .exec();
    if (!messages[0]) throw new HttpException('No more messages to load', 400);
    return messages;
  }
}
