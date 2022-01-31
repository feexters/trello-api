import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeskColumnsService } from './services/desk-columns.service';
import { DeskColumn } from './entities/desk-column.entity';
import { JwtAuthGuard } from 'src/auth/guards';
import { DeskColumnOwnerGuard } from './guard';
import { DeskColumnCreateDto, DeskColumnUpdateDto } from './dto';

@ApiTags('desk-columns')
@Controller('users/:userId')
export class DeskColumnsController {
  constructor(private readonly deskColumnsService: DeskColumnsService) {}

  @Get('/columns')
  @ApiResponse({ type: [DeskColumn] })
  getAllColumnsByUser(@Param('userId') userId: string) {
    return this.deskColumnsService.getAllByUserId(userId);
  }

  @Get('/columns/:columnId')
  @ApiResponse({ type: DeskColumn })
  getColumnById(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.deskColumnsService.getColumn(userId, columnId);
  }

  @Post('/columns')
  @ApiBearerAuth()
  @ApiResponse({ type: DeskColumn })
  @UseGuards(JwtAuthGuard, DeskColumnOwnerGuard)
  createColumn(
    @Body() deskColumnCreateDto: DeskColumnCreateDto,
    @Param('userId') userId: string,
  ) {
    return this.deskColumnsService.createColumn(deskColumnCreateDto, userId);
  }

  @Patch('/columns/:columnId')
  @ApiBearerAuth()
  @ApiResponse({ type: DeskColumn })
  @UseGuards(JwtAuthGuard, DeskColumnOwnerGuard)
  updateColumn(
    @Body() deskColumnUpdateDto: DeskColumnUpdateDto,
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.deskColumnsService.updateColumn(deskColumnUpdateDto, {
      userId,
      columnId,
    });
  }

  @Delete('/columns/:columnId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, DeskColumnOwnerGuard)
  deleteColumn(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
  ) {
    return this.deskColumnsService.deleteColumn({
      userId,
      columnId,
    });
  }
}
