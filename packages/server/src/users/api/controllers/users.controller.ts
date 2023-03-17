import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { UsersService } from '@app/users/application/services/users.service';
import { UserViewModel } from '@app/users/domain/models/user-view.model';
import { CreateUserDto } from '@app/users/api/dtos/create-user.dto';
import { UserMapper } from '@app/users/utils/mappers/user.mapper';
import { ApiPaths } from '@app/config/api.config';

@Controller(ApiPaths.users)
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserViewModel> {
    const result = await this.usersService.create(createUserDto);

    if (result.ok) {
      return UserMapper.mapToViewModel(result.value);
    } else {
      throw new HttpException(
        'User cannot be created, try again later',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
