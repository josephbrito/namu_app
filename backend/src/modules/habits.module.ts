import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitsController } from '../controllers/habits.controller';
import { HabitsModel } from '../models/habits.model';
import { CheckinsModel } from '../models/checkins.model';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            charset: 'utf8mb4',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'root',
            database: process.env.DB_NAME || 'namu_habits',
            synchronize: false,
            autoLoadEntities: true
        }),
        TypeOrmModule.forFeature([HabitsModel, CheckinsModel]),
    ],
    controllers: [HabitsController],
})
export class HabitsModule {}