import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users.module';
import { TodoModule } from './modules/todos.module';

@Module({
  imports: [UserModule, TodoModule], //* lista de módulos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
