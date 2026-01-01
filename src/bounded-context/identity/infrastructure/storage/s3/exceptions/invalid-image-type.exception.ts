import { BadRequestException } from '@nestjs/common';

export class InvalidImageTypeException extends BadRequestException {
  constructor(allowedTypes: string[]) {
    super({
      message: `Invalid image type. Allowed types: ${allowedTypes.join(', ')}`,
      error: 'Bad Request',
      statusCode: 400,
      errorCode: 'IMAGE_TYPE_INVALID',
    });
  }
}
