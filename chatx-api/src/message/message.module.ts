import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageSchema } from '../schemas/message.schema';
import { ConversationModule } from '../conversation/conversation.module';
import { UsersModule } from '../users/users.module';
import { AppGateway } from '../app.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    ConversationModule,
    UsersModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, AppGateway],
  exports: [MessageService],
})
export class MessageModule {}
