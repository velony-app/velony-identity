import { AggregateId } from 'src/shared/domain/base.entity';
import { StoragePath } from 'src/shared/domain/value-objects/storage-path.vo';

import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { Name } from '../../domain/value-objects/name.vo';
import { PasswordHash } from '../../domain/value-objects/password-hash.vo';
import { PhoneNumber } from '../../domain/value-objects/phone-number.vo';
import { Username } from '../../domain/value-objects/username.vo';

export class UserCommandMapperPg {
  public static toEntity(props: {
    uuid: AggregateId;
    name: string;
    username: string;
    avatar_path: string | null;
    password_hash: string | null;
    email: string | null;
    phone_number: string | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  }): UserEntity {
    return UserEntity.reconstitute({
      id: props.uuid,
      name: Name.create(props.name),
      username: Username.create(props.username),
      avatarPath:
        props.avatar_path !== null
          ? StoragePath.create(props.avatar_path)
          : null,
      passwordHash:
        props.password_hash !== null
          ? PasswordHash.create(props.password_hash)
          : null,
      email: props.email !== null ? Email.create(props.email) : null,
      phoneNumber:
        props.phone_number !== null
          ? PhoneNumber.create(props.phone_number)
          : null,
      createdAt: props.created_at,
      updatedAt: props.updated_at,
      deletedAt: props.deleted_at,
    });
  }

  public static toPersistence(entity: UserEntity): {
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
  } {
    return {
      uuid: entity.id,
      name: entity.name.value,
      username: entity.username.value,
      avatar_path: entity.avatarPath?.value ?? null,
      password_hash: entity.passwordHash?.value ?? null,
      email: entity.email?.value ?? null,
      phone_number: entity.phoneNumber?.value ?? null,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
      deleted_at: entity.deletedAt,
    };
  }
}
