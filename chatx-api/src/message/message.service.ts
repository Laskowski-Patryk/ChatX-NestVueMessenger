import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConversationModule } from '../conversation/conversation.module';
import { ConversationService } from '../conversation/conversation.service';
import { ConversationDto } from '../dtos/conversation.dto';
import { MessageDto } from '../dtos/message.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<MessageDto>,
    private readonly conversationService: ConversationService,
    private readonly userService: UsersService,
  ) {}

  public async loadAll(
    id_user: any,
    messagesToLoad: number,
    conversationsToLoad: number,
    alreadyLoaded: number,
  ): Promise<MessageDto[]> {

    let conversations = await this.conversationService.getAllConversations(
      id_user,
      conversationsToLoad,
      alreadyLoaded,
    );
    let messages = [];
    for (const conv of conversations) {
      let uID = conv.id_users.user2;
      if (conv.id_users.user != id_user) uID = conv.id_users.user;
      const user = await this.userService.getUserById(uID.toString());// @ts-ignore: Unreachable code error

      const nameSurname = {name: user.name, surname: user.surname, id:user._id};
      let message;
     
      message = (await this.messageModel
        .find({ id_conversation: conv._id })
        .sort({ send_date: -1 })
        .limit(messagesToLoad)
        .exec())
        message.unshift(nameSurname);
      messages.push(message);
    }
    if (!messages || !messages[0])
      throw new HttpException('No messages to load', 400);

      

    return messages;
  }

  public async makeasseen(msgID:string){
    const msg = await this.messageModel
      .findOneAndUpdate({ _id: msgID }, { seen: true })
      .exec();
      if (!msg) {
        throw new HttpException('Not Found', 404);
      }
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
      user,
      user2,
    );

    if (!conversation) {
      let createConversation = await this.conversationService
        .createConversation(user, user2)
        .catch((err) => {
          throw new HttpException(err, 400);
        });
      idConv = createConversation._id;
    } else {
      idConv = conversation._id;
    }

    message.id_user = user;
    message.id_conversation = idConv;
    message.message = msg;
    message.send_date = Date.now() + 2 * 60 * 60 * 1000;
    message.save().catch((err) => {
      throw new HttpException('Something went wrong', 400);
    });
    return message;
  }
}
