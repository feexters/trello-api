import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserUpdateDto } from './dto/users.dto';
import { UserOwnerGuard } from './guards';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUser(@Param('userId') id: string) {
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Patch(':userId')
  updateUser(
    @Param('userId') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return this.usersService.updateUser(userUpdateDto, id);
  }

  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @Delete(':userId')
  deleteUser(@Param('userId') id: string) {
    return this.usersService.deleteUser(id);
  }
}
