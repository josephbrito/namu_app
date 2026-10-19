import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { HabitsModel } from './habits.model';

@Entity('checkins')
@Unique('unique_checkin', ['habit_id', 'date'])
export class CheckinsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    habit_id: number;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @ManyToOne(() => HabitsModel, (habit) => habit.checkIns, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'habit_id' })
    habit: HabitsModel;
}