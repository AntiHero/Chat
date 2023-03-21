import { IsString, MaxLength, MinLength } from 'class-validator';

import { IsUserAlreadyExist } from '@app/@common/validators/unique-username.validator';

export class SignUpDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsUserAlreadyExist()
  public readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  public readonly password: string;
}
