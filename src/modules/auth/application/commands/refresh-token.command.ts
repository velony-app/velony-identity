import { Command } from 'src/shared/application/base.command';

type Props = {
  refreshToken: string;
};

export class RefreshTokenCommand extends Command<Props> {
  constructor(props: Props) {
    super(props);
  }
}
