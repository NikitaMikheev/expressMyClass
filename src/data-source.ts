import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { Lessons } from './model/entity/Lessons';
import { Students } from './model/entity/Students';
import { Teachers } from './model/entity/Teachers';
import { Lesson_Students } from './model/entity/Lesson_Students';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: String(process.env.POSTGRES_HOST),
  port: Number(process.env.POSTGRES_PORT),
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  synchronize: false,
  migrationsRun: true,
  logging: false,
  entities: [Lessons, Students, Teachers, Lesson_Students],
  // entities: ['src/model/entity/*.ts'],
  migrations: [path.join(__dirname, '/model/migrations/*.ts')],
  // migrations: [User, City, UserTree],
  subscribers: [],
});
