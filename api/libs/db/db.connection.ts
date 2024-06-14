import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export function getConnectionOptions(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    migrations: ['dist/libs/db/migrations/*.js'],
    synchronize: false,
    entities: ['dist/libs/db/entities/*.js'],
  };
}
