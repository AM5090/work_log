import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journal.model';
import { JournalDto } from './dto/journal.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class JournalService {
  constructor(@InjectModel(Journal) private journalModel: typeof Journal) {}

  async get(sorted: string): Promise<Journal[]> {
    return this.journalModel.findAll({
      order: [['createdAt', sorted]],
    });
  }

  async create(data: JournalDto): Promise<Journal> {
    return this.journalModel.create({
      workType: data.workType,
      volume: data.volume,
      executor: data.executor,
    } as unknown as CreationAttributes<Journal>);
  }

  async delete(ids: number[]): Promise<number> {
    return await this.journalModel.destroy({
      where: {
        id: ids,
      },
    });
  }

  async update(id: number, data: JournalDto): Promise<Journal> {
    const [affectedCount, affectedRows] = await this.journalModel.update(
      {
        workType: data.workType,
        volume: data.volume,
        executor: data.executor,
      } as unknown as CreationAttributes<Journal>,
      {
        where: { id: id },
        returning: true,
      },
    );

    if (affectedCount === 0) {
      throw new NotFoundException(`Journal with id ${id} not found`);
    }

    return affectedRows[0];
  }
}
