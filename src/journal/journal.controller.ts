import {
  Body,
  Controller,
  Delete,
  Get,
  // Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JournalDto } from './dto/journal.dto';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  async get(@Query('sortedBy') sorted: string = 'ASC') {
    return this.journalService.get(sorted);
  }

  @Post()
  async create(@Body() dto: JournalDto) {
    return this.journalService.create(dto);
  }

  @Delete()
  async delete(@Query('id') ids: string) {
    const idArray = ids.split(',').map((id) => +id);
    return this.journalService.delete(idArray);
  }

  @Put()
  async update(@Query('id') id: string, @Body() dto: JournalDto) {
    return this.journalService.update(+id, dto);
  }
}
