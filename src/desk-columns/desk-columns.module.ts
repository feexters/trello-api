import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeskColumnsController } from './desk-columns.controller';
import { DeskColumnsRepository } from './repositories';
import { DeskColumnsService } from './services/desk-columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeskColumnsRepository])],
  controllers: [DeskColumnsController],
  providers: [DeskColumnsService],
})
export class DeskColumnsModule {}
