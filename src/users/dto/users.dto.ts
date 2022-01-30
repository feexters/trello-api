import { User } from '../entities';
import { PartialType, PickType } from '@nestjs/swagger';

export class UserCreateDto extends PickType(User, [
  'username',
  'password',
  'email',
]) {}

export class UserUpdateDto extends PartialType(UserCreateDto) {}
