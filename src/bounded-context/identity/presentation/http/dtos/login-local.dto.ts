import { IsString } from 'class-validator';

export class LoginLocalDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
