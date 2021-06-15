import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    forwardRef(() => UsersModule)
  ],
  controllers: [MailerController],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
