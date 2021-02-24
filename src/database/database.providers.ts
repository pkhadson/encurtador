import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import { Url } from '../url/url.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres' as Dialect,
        dialectOptions: {
          ssl: process.env.DB_SSL
            ? { require: true, rejectUnauthorized: false }
            : false,
        },
        host: process.env.DB_HOST || 'localhost',
        port: 5432,
        username: process.env.DB_USER || 'encurtador',
        password: process.env.DB_PASS || 'encurtador',
        database: process.env.DB_NAME || 'encurtador',
        logging: false,
      });
      sequelize.addModels([Url]);
      Url.sync({ alter: true });
      await sequelize.sync();
      return sequelize;
    },
  },
];
