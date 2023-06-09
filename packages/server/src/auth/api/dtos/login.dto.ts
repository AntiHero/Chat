import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly password: string;
}
