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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ type: [User] })
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':userId')
  @ApiResponse({ type: User })
  getUser(@Param('userId') id: string) {
    return this.usersService.getById(id);
  }

  @Patch(':userId')
  @ApiBearerAuth()
  @ApiBody({ type: UserUpdateDto })
  @ApiResponse({ type: User })
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  updateUser(
    @Param('userId') id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return this.usersService.updateUser(userUpdateDto, id);
  }

  @Delete(':userId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  deleteUser(@Param('userId') id: string) {
    return this.usersService.deleteUser(id);
  }
}
