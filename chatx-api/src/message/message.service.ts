import { Get, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationService } from '../conversation/conversation.service';
import { ConversationDto } from '../dtos/conversation.dto';
import { MessageDto } from '../dtos/message.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<MessageDto>,
    private readonly conversationService: ConversationService,
  ) {}

  public async loadAll(
    id_user: any,
    loadCount: number,
    loaded: number,
  ): Promise<MessageDto[]> {
    let conversations = await this.conversationService.getAllConversations(
      id_user.id,
    );

    const messages = await this.messageModel
      .find({})
      .sort({ send_date: -1 })
      .limit(loadCount)
      .exec();
    if (!messages || !messages[0])
      throw new HttpException('No messages to load', 400);

    return messages;
  }

  public async scrollLoad(
    conversation: ConversationDto,
    loadCount: number,
    loaded: number,
  ): Promise<MessageDto[]> {
    const messages = await this.messageModel
      .find({ id_conversation: conversation._id })
      .sort({ send_date: -1 })
      .skip(loaded)
      .limit(loadCount)
      .exec();
    if (!messages || !messages[0])
      throw new HttpException('No more messages to load', 400);
    return messages;
  }

  public async send(msg: string, user: any, user2: UserDto): Promise<object> {
    let idConv;
    const mes = new MessageDto();
    const message = new this.messageModel(mes);
    let conversation = await this.conversationService.getConversationId(
      user.id,
      user2,
    );

    if (!conversation) {
      let createConversation = await this.conversationService
        .createConversation(user.id, user2)
        .catch((err) => {
          throw new HttpException(err, 400);
        });
      idConv = createConversation._id;
    } else {
      idConv = conversation._id;
    }
    message.id_user = user._id;
    message.id_conversation = idConv;
    message.message = msg;
    message.send_date = Date.now()+(2*60*60*1000);
    message.save().catch((err) => {
      throw new HttpException('Something went wrong', 400);
    });
    return { message: 'Sent' };
  }
}
