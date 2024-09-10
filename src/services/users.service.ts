import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers() {
    return 'Obtener todos los usuarios';
  }
}
