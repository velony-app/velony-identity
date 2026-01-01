import { Command } from '@shared-kernel/libs/command';

type Props = {
  phoneNumber: string;
};

type Context = {
  userId: string;
};

export class UpdateUserPhoneNumberCommand extends Command<Props, Context> {
  constructor(props: Props, context: Context) {
    super(props, context);
  }
}
