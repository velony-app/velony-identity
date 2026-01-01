import { Command } from '@shared-kernel/libs/command';

type Props = {
  currentPassword: string;
};

type Context = {
  userId: string;
};

export class RemoveUserPasswordCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
