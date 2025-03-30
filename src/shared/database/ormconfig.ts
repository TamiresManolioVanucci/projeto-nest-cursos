import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 3000,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [
    __dirname + '/../../src/modules/**/domain/entities/*.entity.{js,ts}',
  ],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
});
