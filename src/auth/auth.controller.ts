import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInDto, AuthSignUpDto, AuthResponseDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() authSignInDto: AuthSignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(authSignInDto);
  }

  @Post('/sign-up')
  signUp(@Body() authSignUpDto: AuthSignUpDto) {
    return this.authService.signUp(authSignUpDto);
  }
}
