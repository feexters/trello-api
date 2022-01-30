import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserUpdateDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
    return this.usersService.updateUser(userUpdateDto, id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
