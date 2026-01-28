import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNutritionGoalDto } from './dto/create-nutrition-goal.dto';
import { UpdateNutritionGoalDto } from './dto/update-nutrition-goal.dto';
import { NutritionGoalRepository } from './nutrition-goal.repository';
import type { ReqUser } from 'src/types/ReqUser';

@Injectable()
export class NutritionGoalService {
    constructor(private readonly repo: NutritionGoalRepository) {}

    async create(userId: number, dto: CreateNutritionGoalDto) {
        const exists = await this.repo.findOne(userId);
        if(!exists) return this.repo.create(userId, dto);
        throw new ConflictException("This user already has a nutrition goal! update it instead");
    }

    async updateUserNutritionGoal(userId: number , dto: UpdateNutritionGoalDto) {
        const selected = await this.find(userId)
        if(!selected) throw new ForbiddenException("This user has no nutrition goal");
        return this.repo.update(selected.id, dto);
    }

    async find(userId: number) {
        const res = await this.repo.findOne(userId);
        if(!res) throw new NotFoundException("This user has no nutrition goal");
        return res;
    }
    update(id: number, dto: UpdateNutritionGoalDto) {
        return this.repo.update(id, dto);
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
