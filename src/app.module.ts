import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './common/services/typeorm-config.service';
import { UsersModule } from './users/users.module';
import { DeskColumnsModule } from './desk-columns/desk-columns.module';
import { CommentsModule } from './comments/comments.module';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import * as configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration.configuration],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    DeskColumnsModule,
    CommentsModule,
    CardsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
