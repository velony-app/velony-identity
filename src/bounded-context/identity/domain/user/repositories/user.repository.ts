import { type UserEntity } from '@identity-domain/user/aggregates/user.entity';
import { type UserId } from '@identity-domain/user/value-objects/user-id.vo';
import { type Username } from '@identity-domain/user/value-objects/username.vo';

export abstract class UserRepository {
  public abstract findById(id: UserId): Promise<UserEntity | null>;

  public abstract findByUsername(
    username: Username,
  ): Promise<UserEntity | null>;

  public abstract save(entity: UserEntity): Promise<void>;
}
