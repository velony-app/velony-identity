import { Command } from '@shared-kernel/libs/command';

type Props = {
  currentPassword: string;
  password: string;
};

type Context = {
  userId: string;
};

export class UpdateUserPasswordCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
