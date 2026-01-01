import { BadRequestException } from '@nestjs/common';
import { type ValidationError } from '@nestjs/common';

export interface ValidationDetailProps {
  field: string;
  messages?: string[];
  children?: ValidationDetailProps[];
}

export class BadValidationRequest extends BadRequestException {
  constructor(errors: ValidationError[]) {
    const detail = BadValidationRequest.transformErrors(errors);

    super({
      message: 'Validation error',
      error: 'Bad Request',
      statusCode: 400,
      errorCode: 'VALIDATION_ERROR',
      detail,
    });
  }

  private static transformErrors(
    errors: ValidationError[],
  ): ValidationDetailProps[] {
    return errors.map((error) => ({
      field: error.property,
      ...(error.constraints
        ? { messages: Object.values(error.constraints) }
        : {}),
      ...(error.children && error.children.length > 0
        ? { children: this.transformErrors(error.children) }
        : {}),
    }));
  }
}
