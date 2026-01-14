import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { CreateMealItemDto } from './dto/create-mealItem.dto';
import { MealRepository } from './meal.repository';
import { ReqUser } from 'src/types/ReqUser';

@Injectable()
export class MealService {
    constructor(private readonly repo: MealRepository) {}

    create(user: ReqUser, dto: CreateMealDto) {
        return this.repo.create(user.sub, dto);
    }
    findUserMeals(user: ReqUser) {
        return this.repo.findUserMeals(user.sub);
    }
    findUserMealsByTimePeriod(user: ReqUser, startISO: Date, endISO: Date) {
        // ISO 8601: YYYY-MM-DDTHH:MM:SS.sssZ
        return this.repo.findUserMealsByTimePeriod(user.sub, startISO, endISO);
    }
    async createMealItem(user: ReqUser, mealId: number, dto: CreateMealItemDto) {
        const meal = await this.repo.findByMealId(mealId);
        if(!meal) return new ForbiddenException(`Meal at id:${mealId} does not exist!`);
        if(meal.userId != user.sub) return new UnauthorizedException(`User at user.id:${user.sub} 
                                                                     does not own meal at meal.id:${meal.userId}`);
        return this.repo.createMealItem(mealId, dto);
    }
    
    findMealItems(mealId: number) {
        return this.repo.findMealItems(mealId);
    }
}
