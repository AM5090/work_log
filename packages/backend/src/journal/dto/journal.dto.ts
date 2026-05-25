import {
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class MutateJournalDto {
  @IsString()
  @IsNotEmpty({ message: 'Тип работ не указан' })
  workType: string;

  @IsString()
  @IsNotEmpty({ message: 'Объем работ не указан' })
  volume: string;

  @IsString()
  @IsNotEmpty({ message: 'Исполнитель не указан' })
  executor: string;
}

export class DeleteJournalDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @Transform(({ value }) => value.split(',').map(v => +v))
  ids: number[];
}

export class GetJournalQueryDto {
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortedBy: 'ASC' | 'DESC' = 'ASC';
}
