import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from 'src/services/todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getUsers(): any {
    return this.todoService.getTodos();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getTodoById(@Param('id') id: number) {
    console.log(typeof id);
    console.log(id);

    return `Este es el todo con el id ${id}`;
  }
}
