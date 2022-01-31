import { User } from '../entities';
import { PickType } from '@nestjs/swagger';

export class UserCreateDto extends PickType(User, [
  'username',
  'password',
  'email',
]) {}

export class UserUpdateDto extends PickType(User, ['username']) {}
