import { OmitType, PickType } from '@nestjs/swagger';
import { User } from 'src/users/entities';

export class AuthSignInDto extends PickType(User, ['password', 'email']) {}

export class AuthSignUpDto extends PickType(User, [
  'username',
  'password',
  'email',
]) {}

export class AuthResponseDto extends OmitType(User, ['password']) {
  token: string;
}

export class JwtPayload extends PickType(User, ['id', 'email']) {
  expiration: Date;
}
