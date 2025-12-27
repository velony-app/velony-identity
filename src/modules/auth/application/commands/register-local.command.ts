import { Command } from 'src/shared/application/base.command';

type Props = {
  name: string;
  username: string;
  password: string;
};

export class RegisterLocalCommand extends Command<Props> {
  constructor(props: Props) {
    super(props, undefined);
  }
}
