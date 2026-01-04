import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { TypedConfigService } from '@config/typed-config.service';

import { BadValidationRequest } from '@common/exceptions/bad-validation-error.exception';
import { AuthExceptionFilter } from '@common/filters/authentication-exception.filter';

import { AppModule } from '@/app.module';
import { UserExceptionFilter } from '@identity/presentation/http/filters/user-exception.filter';
import { VerificationExceptionFilter } from '@identity/presentation/http/filters/verification-exception.filter';

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

  app.useGlobalFilters(
    new AuthExceptionFilter(),
    new UserExceptionFilter(),
    new VerificationExceptionFilter(),
  );

  app.setGlobalPrefix('api');

  await app.listen(configService.get('PORT'));
}

bootstrap();
