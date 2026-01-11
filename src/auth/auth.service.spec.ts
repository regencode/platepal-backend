jest.mock('src/users/user.repository', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockImplementation((dto) => ({
        id: 1,
        ...dto,
      })),
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockImplementation((id) => ({ id, name: 'Test User' })),
      findOneWithEmail: jest.fn().mockImplementation((email) => ({ id: 1, email, name: 'Test User' })),
      update: jest.fn().mockImplementation(async (id, dto) => ({ id, ...dto })),
      remove: jest.fn().mockImplementation((id) => ({ id })),
    })),
  };
});

// auth.service.spec.ts
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/users/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => {
  const original = jest.requireActual('bcrypt');
  return {
    ...original,
    compare: jest.fn(() => Promise.resolve(false)), // override only compare
  };
});

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findOneWithEmail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const dto = {
        name: 'Test User',
        email: 'test@test.com',
        password: 'Password123',
      };

      jest.spyOn(userRepo, 'findOneWithEmail').mockResolvedValue(null);
      jest.spyOn(userRepo, 'create').mockResolvedValue({
        id: 1,
        name: dto.name,
        email: dto.email,
        password: 'hashed',
        role: 'CUSTOMER',
        refreshToken: null,
        createdAt: new Date(),
      } as any);

      const result = await service.register(dto);

      expect(userRepo.findOneWithEmail).toHaveBeenCalledWith(dto.email);
      expect(userRepo.create).toHaveBeenCalled();
      expect(result.email).toBe(dto.email);
    });

    it('should throw UnauthorizedException if email already exists', async () => {
      const dto = {
        name: 'Test',
        email: 'existing@test.com',
        password: 'Password123',
      };

      jest.spyOn(userRepo, 'findOneWithEmail').mockResolvedValue({
        id: 1,
        email: dto.email,
      } as any);

      await expect(service.register(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should login user and return tokens', async () => {
      const dto = { email: 'test@test.com', password: 'Password123' };
      const user = {
        id: 1,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      };

      jest.spyOn(userRepo, 'findOneWithEmail').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
      jest.spyOn(userRepo, 'update').mockResolvedValue(user as any);

      const result = await service.login(dto);

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      const dto = { email: 'wrong@test.com', password: 'Password123' };

      jest.spyOn(userRepo, 'findOneWithEmail').mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for incorrect password', async () => {
      const dto = { email: 'test@test.com', password: 'WrongPassword' };
      const user = {
        id: 1,
        email: dto.email,
        password: await bcrypt.hash('CorrectPassword', 10),
      };

      jest.spyOn(userRepo, 'findOneWithEmail').mockResolvedValue(user as any);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
