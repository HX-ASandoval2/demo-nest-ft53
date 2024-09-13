import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users.module';
import { TodoModule } from './modules/todos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserModule,
    TodoModule,
  ], //* lista de módulos
  controllers: [AppController],
  providers: [AppService],
  // providers: [
  //   {
  //     provide: AppService,
  //     useClass: AppService,
  //   },
  // ],
})
export class AppModule {}
