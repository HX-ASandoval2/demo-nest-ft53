import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserDbService } from './user-db.service';
import { User } from '../entities/user.entity';

describe('Authservice', () => {
  let authService;
  let mockUsersService: Partial<UserDbService>;

  const mockUser: Partial<User> = {
    name: 'Bartolomiau',
    createdAt: '26/02/2024',
    password: 'password123',
    email: 'barto@gmail.com',
  };

  beforeEach(async () => {
    mockUsersService = {
      findByEmail: () => Promise.resolve(undefined),
      create: (user: Partial<User>) =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: '1234fs-234sd-24csdf-34sdfg',
        } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UserDbService,
          useValue: mockUsersService,
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signup() creates and returns a new user with an encripted Password', async () => {
    const user = await authService.signUp(mockUser as User);

    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });

  it('signin() creates and returns a token an message', async () => {
    mockUsersService.findByEmail = () => Promise.resolve(mockUser as User);

    const user = await authService.signIn(mockUser as User);

    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });
});
