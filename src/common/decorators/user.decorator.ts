import { createParamDecorator } from '@nestjs/common';
import { type ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // eslint-disable-next-line security/detect-object-injection
    return data ? user[data] : user;
  },
);
