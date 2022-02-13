import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

describe('AppController', () => {
  let appController: AppController;

  const mockAppService = {};
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAppService)
      .compile();

    appController = app.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
