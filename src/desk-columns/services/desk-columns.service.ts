import { DeskColumnUpdateDto } from './../dto/desk-columns.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeskColumnCreateDto } from '../dto';
import { DeskColumnsRepository } from '../repositories/desk-columns.repository';

@Injectable()
export class DeskColumnsService {
  constructor(private readonly deskColumnsRepository: DeskColumnsRepository) {}

  getAllByUserId(userId: string) {
    return this.deskColumnsRepository.find({ userId });
  }

  async getColumn(userId: string, columnId: string) {
    const column = await this.deskColumnsRepository.findOne({
      id: columnId,
      userId,
    });

    if (!column) {
      throw new NotFoundException('column not found');
    }

    return column;
  }

  createColumn(columnCreateDto: DeskColumnCreateDto, userId: string) {
    const columnCreated = this.deskColumnsRepository.create({
      userId,
      ...columnCreateDto,
    });

    return this.deskColumnsRepository.save(columnCreated);
  }

  async updateColumn(
    columnUpdateDto: DeskColumnUpdateDto,
    { userId, columnId }: { userId: string; columnId: string },
  ) {
    const column = await this.getColumn(userId, columnId);

    return this.deskColumnsRepository.save({ ...column, ...columnUpdateDto });
  }

  deleteColumn({ userId, columnId }: { userId: string; columnId: string }) {
    return this.deskColumnsRepository.delete({ id: columnId, userId });
  }
}
