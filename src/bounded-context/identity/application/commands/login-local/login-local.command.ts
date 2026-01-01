import { Command } from '@shared-kernel/libs/command';

type Props = {
  username: string;
  password: string;
};

export class LoginLocalCommand extends Command<Props> {
  constructor(props: Props) {
    super(props);
  }
}
