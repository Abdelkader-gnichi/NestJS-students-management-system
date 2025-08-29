import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // whitelist: true allows you to accept only the properties that are defined in the DTOs
    // without any errors when the is extra properties in the request body.
    // forbidNonWhitelisted: true if there are extra properties in the request body against
    // what we have in the DTOs object it will throw an error.
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
