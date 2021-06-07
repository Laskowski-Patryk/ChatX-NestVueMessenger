import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lasek:lasek123@cluster0.8f7wo.mongodb.net/test',
    ), 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
