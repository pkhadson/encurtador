import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { generate as randomString } from 'randomstring';
import { Logger } from '@nestjs/common';
import * as moment from 'moment';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

@Table({
  tableName: 'url',
})
export class Url extends Model<Url> {
  //@IsString()
  @Column
  url: string;

  @Unique
  @Default(() => randomString(Math.floor(5 + Math.random() * 6)))
  @AllowNull(false)
  @Column
  code: string;

  @AllowNull(false)
  @Default(() => moment().add(90, 'days').format('YYYY-MM-DD HH:mm:ss'))
  @Column(DataType.DATE)
  expire: string;
}

setTimeout(() => Url.sync({ alter: true }), 100);
