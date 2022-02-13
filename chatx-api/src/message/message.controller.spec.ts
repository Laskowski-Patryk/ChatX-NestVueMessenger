import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
describe('MessageController', () => {
  let messageController: MessageController;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService]
    }).compile();

    messageService = module.get<MessageService>(MessageService);
  });


  it('should be defined', () => {
    expect(messageService).toBeDefined();
  });
});
