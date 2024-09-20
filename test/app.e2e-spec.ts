import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/todos (GET) returns an array of todos with status code 200', async () => {
    const req = await request(app.getHttpServer()).get('/todos/');

    //PARA RUTAS PROTEGIDAS
    //.overrideGuard(AuthGuard)
    // .useValue({
    //   canActivate: () => true,

    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});
