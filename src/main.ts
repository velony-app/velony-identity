import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { TypedConfigService } from '@config/typed-config.service';

import { BadValidationRequest } from '@common/exceptions/bad-validation-error.exception';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(TypedConfigService);

  app.enableCors({
    origin: configService.get('FRONTEND_ORIGIN'),
    credentials: configService.get('NODE_ENV') === 'production',
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: false,
      exceptionFactory: (errors) => new BadValidationRequest(errors),
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(configService.get('PORT'));
}

bootstrap();
