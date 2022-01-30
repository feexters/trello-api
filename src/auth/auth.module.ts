import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JWTConfigService } from './services/jwt-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
