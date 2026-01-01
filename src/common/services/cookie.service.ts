import { Injectable } from '@nestjs/common';
import { type Response } from 'express';

import { TypedConfigService } from '@config/typed-config.service';

export interface CookieOptions {
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
  maxAge?: number;
  path?: string;
}

@Injectable()
export class CookieService {
  constructor(private readonly configService: TypedConfigService) {}

  private getDefaultOptions(): CookieOptions {
    const isProduction = this.configService.get('NODE_ENV') === 'production';

    return {
      httpOnly: true,
      sameSite: 'strict',
      secure: isProduction,
      path: '/',
    };
  }

  set(
    response: Response,
    name: string,
    value: string,
    options?: CookieOptions,
  ): void {
    response.cookie(name, value, {
      ...this.getDefaultOptions(),
      ...options,
    });
  }

  clear(response: Response, names: string[]): void {
    names.forEach((name) => response.clearCookie(name));
  }
}
