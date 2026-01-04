import {
  Body,
  Controller,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';

import { User } from '@common/decorators/user.decorator';
import { JwtCookieAuthGuard } from '@common/guards/jwt-cookie-auth.guard';

import { UpdateUserAvatarPathCommand } from '@identity-application/commands/update-user-avatar-path/update-user-avatar-path.command';
import { UpdateUserNameCommand } from '@identity-application/commands/update-user-name/update-user-name.command';
import { UpdateUserUsernameCommand } from '@identity-application/commands/update-user-username/update-user-username.command';
import { S3ImageService } from '@identity-infrastructure/storage/s3/s3-image.service';
import { UpdateUserNameDto } from '@identity-presentation/http/dtos/update-user-name.dto';
import { UpdateUserUsernameDto } from '@identity-presentation/http/dtos/update-user-username.dto';

@Controller('users')
@UseGuards(JwtCookieAuthGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly s3ImageService: S3ImageService,
  ) {}

  @Patch('me/name')
  async updateName(
    @User('id') userId: string,
    @Body() dto: UpdateUserNameDto,
  ): Promise<void> {
    const command = new UpdateUserNameCommand({ name: dto.name }, { userId });
    await this.commandBus.execute(command);
  }

  @Patch('me/username')
  async updateUsername(
    @User('id') userId: string,
    @Body() dto: UpdateUserUsernameDto,
  ): Promise<void> {
    const command = new UpdateUserUsernameCommand(
      { username: dto.username },
      { userId },
    );
    await this.commandBus.execute(command);
  }

  @Patch('me/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(
    @User('id') userId: string,
    @UploadedFile() avatar: Express.Multer.File,
  ): Promise<{ avatarPath: string }> {
    const avatarPath = await this.s3ImageService.uploadImage(
      `users/user-${userId}-avatar`,
      avatar.buffer,
      avatar.mimetype,
    );

    const command = new UpdateUserAvatarPathCommand(
      { avatarPath: avatarPath },
      { userId },
    );
    await this.commandBus.execute(command);

    return { avatarPath: avatarPath };
  }
}
