import { Command } from '@shared-kernel/libs/command';

type Props = {
  avatarPath: string;
};

type Context = {
  userId: string;
};

export class UpdateUserAvatarPathCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
