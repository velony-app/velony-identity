import { Command } from '@shared-kernel/libs/command';

type Props = {
  username: string;
};

type Context = {
  userId: string;
};

export class UpdateUserUsernameCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
