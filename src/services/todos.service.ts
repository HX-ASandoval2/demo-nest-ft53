import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entities/file.entity';
import { TodoRepository } from 'src/repositories/todos.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @Inject('ACCESS_TOKEN') private access_token: string,
    private readonly todoRepository: TodoRepository,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  getTodos() {
    return this.access_token === 'estaEsMiClave'
      ? this.todoRepository.getTodos()
      : 'No tienes acceso a esta información';
  }

  saveFile(name: string, mimeType: string, data: Buffer): Promise<File> {
    const file = new File();

    file.name = name;
    file.mimeType = mimeType;
    file.data = data;

    return this.fileRepository.save(file);
  }
}
