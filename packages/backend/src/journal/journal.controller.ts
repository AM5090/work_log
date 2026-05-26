import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  DeleteJournalDto,
  GetJournalQueryDto,
  MutateJournalDto,
} from './dto/journal.dto';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  async get(@Query('sortedBy') sorted: GetJournalQueryDto['sortedBy']) {
    return this.journalService.get(sorted);
  }

  @Post()
  async create(@Body() dto: MutateJournalDto) {
    return this.journalService.create(dto);
  }

  @Delete()
  async delete(@Query('id', ParseArrayPipe) ids: DeleteJournalDto['ids']) {
    const idArray = ids.map((id) => +id);
    return this.journalService.delete(idArray);
  }

  @Put()
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: MutateJournalDto,
  ) {
    if (isNaN(id)) {
      throw new BadRequestException(
        'Не верный формат id для обновления записи',
      );
    }

    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Данные для обновления не переданы');
    }

    return this.journalService.update(id, dto);
  }
}
