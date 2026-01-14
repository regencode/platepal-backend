import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNutritionGoalDto } from './dto/create-nutrition-goal.dto';
import { UpdateNutritionGoalDto } from './dto/update-nutrition-goal.dto';
import { NutritionGoalRepository } from './nutrition-goal.repository';
import { ReqUser } from 'src/types/ReqUser';

@Injectable()
export class NutritionGoalService {
    constructor(private readonly repo: NutritionGoalRepository) {}
    async create(user: ReqUser, dto: CreateNutritionGoalDto) {
        const exists = await this.repo.findOne(user.sub);
        console.log(exists);
        if(!exists) return this.repo.create(user.sub, dto);
        throw new ConflictException("This user already has a nutrition goal! update it instead");
    }

    async update(user: ReqUser, dto: UpdateNutritionGoalDto) {
        const selected = await this.find(user)
        if(!selected) throw new ForbiddenException("This user has no nutrition goal");
        return this.repo.update(selected.id, dto);
    }

    async find(user: ReqUser) {
        const res = await this.repo.findOne(user.sub);
        if(!res) throw new NotFoundException("This user has no nutrition goal");
        return res;
    }
}
