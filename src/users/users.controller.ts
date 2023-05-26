import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserPayloadDto } from './dtos/user-payload.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.find();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  createUser(@Body() body: UserPayloadDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UserPayloadDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id);

    return {
      message: 'Success',
    };
  }
}
