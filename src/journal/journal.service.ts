import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Journal } from './journal.model';
import { GetJournalQueryDto, MutateJournalDto } from './dto/journal.dto';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class JournalService {
  constructor(@InjectModel(Journal) private journalModel: typeof Journal) {}

  async get(sorted: GetJournalQueryDto['sortedBy'] = 'ASC'): Promise<Journal[]> {
    return this.journalModel.findAll({
      order: [['createdAt', sorted]],
    });
  }

  async create(data: MutateJournalDto): Promise<Journal> {
    return this.journalModel.create({
      workType: data.workType,
      volume: data.volume,
      executor: data.executor,
    } as unknown as CreationAttributes<Journal>);
  }

  async delete(ids: number[]): Promise<string> {
    const deletedCount = await this.journalModel.destroy({
      where: {
        id: ids,
      },
    });

    return `Удалено записей - ${deletedCount}`
  }

  async update(id: number, data: MutateJournalDto): Promise<Journal> {
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
      throw new NotFoundException(`Запись с id ${id} не найдена`);
    }

    return affectedRows[0];
  }
}
