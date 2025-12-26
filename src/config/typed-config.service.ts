import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from './env.config';

@Injectable()
export class TypedConfigService {
  constructor(
    private configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  get<const K extends keyof EnvironmentVariables>(
    key: K,
  ): EnvironmentVariables[K] {
    return this.configService.get(key, { infer: true });
  }
}
