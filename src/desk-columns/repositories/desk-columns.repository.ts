import { EntityRepository, Repository } from 'typeorm';
import { DeskColumn } from '../entities/desk-column.entity';

@EntityRepository(DeskColumn)
export class DeskColumnsRepository extends Repository<DeskColumn> {}
