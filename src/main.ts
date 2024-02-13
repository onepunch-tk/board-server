import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import secureSession from '@fastify/secure-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get<ConfigService>(ConfigService);
  await app.register(secureSession, {
    sessionName: 'mySession',
    cookieName: 'myCookie',
    secret: configService.get('SESSION_SECRET'),
    salt: configService.get('SESSION_SALT'),
    cookie: {
      secure: false,
      maxAge: 10000,
    },
  });

  await app.listen(3000);
}
bootstrap();
