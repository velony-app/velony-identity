import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterLocalDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[A-Za-z0-9_]+$/)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/[a-z]/)
  @Matches(/[A-Z]/)
  @Matches(/[0-9]/)
  @Matches(/[^a-zA-Z0-9]/)
  password: string;
}
