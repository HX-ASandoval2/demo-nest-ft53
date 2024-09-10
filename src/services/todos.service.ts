import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  getTodos() {
    return 'Obtener todos las tareas';
  }
}
