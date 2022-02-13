import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';

describe('E2E Users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/allUsers (GET)', () => {
    return request(app.getHttpServer()).get('/allUsers').expect(200);
  });
  it('/profile (GET)', () => {
    return request(app.getHttpServer()).get('/profile').expect(200);
  });
});
