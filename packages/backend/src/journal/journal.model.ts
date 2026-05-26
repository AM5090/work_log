import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Journal extends Model<Journal> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare workType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare volume: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare executor: string;
}
