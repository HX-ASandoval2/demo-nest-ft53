import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from '../controllers/todos.controller';
import { File } from '../entities/file.entity';
import { TodoRepository } from '../repositories/todos.repository';
import { TodoService } from '../services/todos.service';

const ACCESS = 'estaEsMiClave';
@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [TodoController],
  providers: [
    { provide: 'ACCESS_TOKEN', useValue: ACCESS },
    TodoService,
    TodoRepository,
  ],
})
export class TodoModule {}
