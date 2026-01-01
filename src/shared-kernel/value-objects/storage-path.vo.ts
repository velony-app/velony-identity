import { ValueObject } from '@shared-kernel/libs/value-object';

export class StoragePath extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): StoragePath {
    if (value.startsWith('/')) {
      throw new Error('Storage path should not start with /');
    }
    if (value.includes('//')) {
      throw new Error('Storage path contains invalid double slashes');
    }
    if (value.includes('..')) {
      throw new Error('Storage path cannot contain ..');
    }

    return new StoragePath(value);
  }

  public toUrl(baseUrl: string): string {
    return `${baseUrl.replace(/\/$/, '')}/${this.value}`;
  }

  public get extension(): string {
    const parts = this.value.split('.');
    return parts.at(-1)?.toLowerCase() ?? '';
  }

  public equals(other: ValueObject<string>): boolean {
    return this.value === other.value;
  }
}
