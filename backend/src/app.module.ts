import { Module } from '@nestjs/common';
import { HabitsModule } from './modules/habits.module';


@Module({ imports: [HabitsModule] })
export class AppModule {}
