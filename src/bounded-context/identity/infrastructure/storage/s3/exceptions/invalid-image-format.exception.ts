import { BadRequestException } from '@nestjs/common';

export class InvalidImageFormatException extends BadRequestException {
  constructor(format: string) {
    super({
      message: `Invalid image format: ${format}`,
      error: 'Bad Request',
      statusCode: 400,
      errorCode: 'IMAGE_FORMAT_INVALID',
    });
  }
}
