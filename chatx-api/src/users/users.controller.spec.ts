import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';

describe('AppController', () => {
  let userService: UsersService;
  const reqMock = {
    query: {},
  } as unknown as Request;

  beforeEach(async () => {
    let userService: UsersService;

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    userService = await module.get<UsersService>(UsersService);
  });

  describe('Testing user services', () => {
    it('testing get user by username', () => {
      expect(typeof userService.getUserByUsername('lasek')).not.toEqual(null);
    });

    it('Testing get all users', () => {
      expect(typeof userService.getAllUsers()).not.toBeNull();
    });

  });
});
