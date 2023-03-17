import { IsUserAlreadyExist } from '@app/@common/validators/unique-username.validator';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsUserAlreadyExist()
  readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly password: string;
}
