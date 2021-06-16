import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { MailerController } from './mailer/mailer.controller';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lasek:lasek123@cluster0.8f7wo.mongodb.net/chatx',
      { useCreateIndex: true , useFindAndModify: false},   // Służy do wyłapania tych samych loginów i maili
    ),
    UsersModule,
    AuthModule,
    MessageModule,
    ConversationModule,
    MailerModule
  ],
  controllers: [AppController, MailerController],
  providers: [AppService, MailerService],
})
export class AppModule {}
