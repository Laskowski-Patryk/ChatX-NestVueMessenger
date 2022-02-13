import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { INestApplication } from '@nestjs/common';

describe('E2E Users', () => {
  let app: INestApplication;
  let usersModule = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersModule)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/allUsers Get`, () => {
    return request(app.getHttpServer())
      .get('/allUsers')
      .expect(200)
      .expect({
        data: usersModule.findAll(),
      });
  });

  it(`/profile Get`, () => {
    return request(app.getHttpServer())
      .get('/profile')
      .expect(200)
  });
  afterAll(async () => {
    await app.close();
  });
});