import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UserUpdateDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getById(id: string) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async updateUser(updateDto: UserUpdateDto, userId: string) {
    const user = await this.getById(userId);
    return this.usersRepository.save({ ...user, ...updateDto });
  }

  deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }
}
