import { Injectable } from '@nestjs/common';
import { AggregateId } from 'src/shared/domain/base.entity';
import { PgService } from 'src/shared/infrastructure/persistence/pg/pg.service';

import { UserCommandMapperPg } from './user.command.mapper.pg';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserCommandRepository } from '../../domain/repositories/user.command.repository';
import { Username } from '../../domain/value-objects/username.vo';

type UserEntityRow = {
  uuid: string;
  name: string;
  username: string;
  avatar_path: string | null;
  password_hash: string | null;
  email: string | null;
  phone_number: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

@Injectable()
export class UserCommandRepositoryPg implements UserCommandRepository {
  public constructor(private readonly pgService: PgService) {}

  public async findById(id: AggregateId): Promise<UserEntity | null> {
    const result = await this.pgService.query<UserEntityRow>(
      `
        SELECT
          u.uuid,
          u.name,
          u.username,
          u.avatar_path,
          u.password_hash,
          u.email,
          u.phone_number,
          u.created_at,
          u.updated_at,
          u.deleted_at
        FROM users u
        WHERE u.uuid = $1
      `,
      [id],
    );
    if (!result.rows.at(0)) return null;

    return UserCommandMapperPg.toEntity(result.rows[0]);
  }

  public async findByUsername(username: Username): Promise<UserEntity | null> {
    const result = await this.pgService.query<UserEntityRow>(
      `
        SELECT
          u.uuid,
          u.name,
          u.username,
          u.avatar_path,
          u.password_hash,
          u.email,
          u.phone_number,
          u.created_at,
          u.updated_at,
          u.deleted_at
        FROM users u
        WHERE u.username = $1
      `,
      [username.value],
    );
    if (!result.rows.at(0)) return null;

    return UserCommandMapperPg.toEntity(result.rows[0]);
  }

  public async save(entity: UserEntity): Promise<void> {
    const data = UserCommandMapperPg.toPersistence(entity);

    await this.pgService.query(
      `
        INSERT INTO users (
          uuid,
          name,
          username,
          avatar_path,
          password_hash,
          email,
          phone_number,
          created_at,
          updated_at,
          deleted_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        )
        ON CONFLICT (uuid) DO UPDATE SET
          name = EXCLUDED.name,
          username = EXCLUDED.username,
          avatar_path = EXCLUDED.avatar_path,
          password_hash = EXCLUDED.password_hash,
          email = EXCLUDED.email,
          phone_number = EXCLUDED.phone_number,
          updated_at = EXCLUDED.updated_at,
          deleted_at = EXCLUDED.deleted_at
      `,
      [
        data.uuid,
        data.name,
        data.username,
        data.avatar_path,
        data.password_hash,
        data.email,
        data.phone_number,
        data.created_at,
        data.updated_at,
        data.deleted_at,
      ],
    );
  }
}
