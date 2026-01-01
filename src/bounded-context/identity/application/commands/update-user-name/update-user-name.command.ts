import { Command } from '@shared-kernel/libs/command';

type Props = {
  name: string;
};

type Context = {
  userId: string;
};

export class UpdateUserNameCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
