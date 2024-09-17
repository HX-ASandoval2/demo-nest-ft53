import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger';
// import { UserAuthGuard } from './guards/user-auth.guard';
import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  // app.useGlobalGuards(new UserAuthGuard());
  app.useGlobalInterceptors(new DateAdderInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
