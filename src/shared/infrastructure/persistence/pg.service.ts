import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { EnvironmentVariables } from 'src/config/env.config';

@Injectable()
export class PgService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async onModuleInit() {
    this.pool = new Pool({
      connectionString: this.configService.get('DB_URL', { infer: true }),
      ssl: this.configService.get('NODE_ENV', { infer: true }) === 'production',
      max: this.configService.get('DB_MAX_CONNECTIONS', { infer: true }),
      idleTimeoutMillis: this.configService.get('DB_IDLE_TIMEOUT', {
        infer: true,
      }),
      connectionTimeoutMillis: this.configService.get('DB_CONNECTION_TIMEOUT', {
        infer: true,
      }),
    });

    const client = await this.pool.connect();
    client.release();
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query<T extends QueryResultRow>(
    text: string,
    params?: unknown[],
  ): Promise<QueryResult<T>> {
    const client = await this.pool.connect();
    try {
      const result = await client.query<T>(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  async getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }

  async transaction<T>(
    callback: (client: PoolClient) => Promise<T>,
  ): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
