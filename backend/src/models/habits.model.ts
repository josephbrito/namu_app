import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { CheckinsModel } from './checkins.model';

@Entity('habits')
export class HabitsModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column('text')
    description: string;
    @Column({ type: 'enum', enum: ['diário', 'semanal'] })
    frequency: string;
    @Column({ type: 'enum', enum: ['saúde', 'exercício', 'alimentação', 'mental'] })
    category: string;
    @OneToMany(() => CheckinsModel, (checkin) => checkin.habit)
    checkIns: CheckinsModel[];
}