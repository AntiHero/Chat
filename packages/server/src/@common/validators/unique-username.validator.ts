import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '@app/users/application/services/users.service';

@Injectable()
@ValidatorConstraint({ name: 'UniqueUsername', async: true })
export class UniqueUsernameConstraint implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string): Promise<boolean> {
    const user = await this.usersService.getByQuery({ username });

    if ('value' in user) {
      return !user.value;
    }

    return false;
  }

  defaultMessage(): string {
    return 'Username already exists';
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueUsernameConstraint,
    });
  };
}
