import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserPayloadDto } from './dtos/user-payload.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  find() {
    return this.usersRepository.find();
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(user: UserPayloadDto) {
    return this.usersRepository.create(user);
  }

  async update(id: string, data: UserPayloadDto) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.update(id, data);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.delete(id);
  }
}
