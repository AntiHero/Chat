import { Body, Controller, Post } from '@nestjs/common';

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
    const newUser = await this.usersService.create(createUserDto);

    return UserMapper.mapToViewModel(newUser);
  }
}
