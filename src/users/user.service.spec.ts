jest.mock('./user.repository', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => ({
      create: jest.fn().mockImplementation((dto) => ({
        id: 1,
        ...dto,
      })),
      findAll: jest.fn().mockResolvedValue([
        { id: 1, name: 'Test User', email: 'test@example.com' }
      ]),
      findOne: jest.fn().mockImplementation((id) => ({
        id,
        name: 'Test User',
        email: 'test@example.com',
      })),
      findOneWithEmail: jest.fn().mockImplementation((email) => ({
        id: 1,
        name: 'Test User',
        email,
      })),
      update: jest.fn().mockImplementation((id, dto) => ({
        id,
        ...dto,
      })),
      remove: jest.fn().mockImplementation((id) => ({ id })),
    })),
  };
});

import { UserService } from './user.service';
import { UserRepository } from './user.repository';

describe('UserService', () => {
  let service: UserService;
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserRepository(null as any); // Prisma/DB is mocked anyway
    service = new UserService(repo as any);
  });

  it('should create a user', async () => {
    const dto = { name: 'Alice', email: 'alice@test.com', password: 'pwd' };
    const user = await service.create(dto as any);

    expect(user.id).toBe(1);
    expect(user.name).toBe('Alice');
    expect(repo.create).toHaveBeenCalledWith(dto);
  });

  it('should find a user', async () => {
    const user = await service.findOne(1);
    expect(user.id).toBe(1);
    expect(user.name).toBe('Test User');
    expect(repo.findOne).toHaveBeenCalledWith(1);
  });
});
