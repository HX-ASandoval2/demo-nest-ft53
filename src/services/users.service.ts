import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';

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

  getUser(id: string) {
    return this.usersRepository.getUser(id);
  }

  getByName(name: string) {
    return this.usersRepository.getByName(name);
  }

  createUser(user: any) {
    return this.usersRepository.createUser(user);
  }
}
