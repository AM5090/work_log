import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Journal } from './journal.model';
import { JournalService } from './journal.service';

@Module({
  controllers: [JournalController],
  imports: [SequelizeModule.forFeature([Journal])],
  providers: [JournalService],
})
export class JournalModule {}
