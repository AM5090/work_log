import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Journal extends Model<Journal> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  workType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  volume: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  executor: string;
}
