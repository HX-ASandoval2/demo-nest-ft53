import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger';
// import { UserAuthGuard } from './guards/user-auth.guard';
import { DateAdderInterceptor } from './interceptors/date-adder.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal);
  // app.useGlobalGuards(new UserAuthGuard());
  app.useGlobalInterceptors(new DateAdderInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Demo Nest')
    .setDescription(
      'Esta es una API construida con Nest empleada como demos para el módulo 4 de la especialidad Backend de la carrera fullstack developer de Henry',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
