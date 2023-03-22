import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';

const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );

  app.register(fastifyCookie, {
    secret: COOKIE_SECRET,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT || 8000, '0.0.0.0');
}

bootstrap();
