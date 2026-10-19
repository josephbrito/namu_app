import { IsString } from 'class-validator';

export class HabitsSchema {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsString()
    frequency: string;
    @IsString()
    category: string;
}