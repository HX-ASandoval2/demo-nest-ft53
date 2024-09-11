import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/users.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('API_USERS') private api_users: any[],
    private readonly usersRepository: UserRepository,
  ) {}

  getUsers() {
    const dbUsers = this.usersRepository.getUsers();
    const allUsers = [...dbUsers, ...this.api_users];
    return allUsers;
  }
}
