/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints)
        );
        return new BadRequestException(errorMessages.toString());
      },
      forbidUnknownValues: false,
    })
  );
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/graphql`);
}

bootstrap();
