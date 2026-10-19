import { Controller, Get, Post, Put, Delete, Body, BadRequestException, Param, ParseIntPipe, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitsModel } from '../models/habits.model';
import { HabitsSchema } from '../schemas/habits.schema';
import { CheckinsModel } from '../models/checkins.model';

@Controller('/habits')
export class HabitsController {
    constructor(@InjectRepository(HabitsModel) private model: Repository<HabitsModel>, 
    @InjectRepository(CheckinsModel) private checkinModel: Repository<CheckinsModel>) { }

    @Get()
    public async getAll(): Promise<{ data: HabitsModel[] }> { 
        const list = await this.model.find({relations: { checkIns: true }});
        return { data: list };
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<{ data: HabitsModel }> {
        const habit = await this.model.findOne({ where: { id } });
        if(!habit) { throw new NotFoundException('Hábito não encontrado'); }
        return { data: habit };
    }

    @Post()
    public async create(@Body() body: HabitsSchema): Promise<{ data: HabitsModel }> { 
        const { title, description, frequency, category } = body;

        if (!['diário', 'semanal'].includes(frequency)) throw new BadRequestException('A frequência deve ser diário ou semanal.');
        if (!['saúde', 'exercício', 'alimentação', 'mental'].includes(category)) throw new BadRequestException('A categoria informada é inválida.');

        const habitsCreated = await this.model.save({ title, description: description ?? '', frequency, category });
        return { data: habitsCreated };
    }

    @Post(':id/checkins')
    public async createCheckin(@Param('id', ParseIntPipe) habitId: number, @Body() body: { date: string; notes?: string }): Promise<{ data: string }> {
        const { date, notes } = body;
        
        const habit = await this.model.findOne({ where: { id: habitId } });
        if (!habit) throw new NotFoundException('Hábito não encontrado');

        const existingCheckin = await this.checkinModel.findOne({ where: { habit_id: habitId, date } });
        if (existingCheckin) throw new ConflictException('Já existe um check-in para este hábito nesta data.');
        
        try {
            await this.checkinModel.save({ habit_id: habitId, date, notes: notes ?? '' });
        } catch (error: any) {
            if (error?.code === 'ER_DUP_ENTRY') throw new ConflictException('Já existe um check-in para este hábito nesta data.');
            throw error;
        }

        return { data: 'Check-in criado com sucesso' };
    }

    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() body: HabitsModel): Promise<{ data: string }> { 
        const habit = await this.model.findOne({ where: { id } });
        if(!habit) { throw new NotFoundException('Hábito não encontrado'); }
        const { title, description, frequency, category } = body;

        if (!['diário', 'semanal'].includes(frequency)) throw new BadRequestException('A frequência deve ser diário ou semanal.');
        if (!['saúde', 'exercício', 'alimentação', 'mental'].includes(category)) throw new BadRequestException('A categoria informada é inválida.');

        await this.model.update({ id }, { title, description: description ?? '', frequency, category });
        return { data: 'Hábito atualizado com sucesso' };
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<{ data: string }> { 
        const habit = await this.model.findOne({ where: { id } });
        if(!habit) { throw new NotFoundException('Hábito não encontrado'); }
        await this.model.delete(id);
        return { data: 'Hábito excluído com sucesso' }
    }
}