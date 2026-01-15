import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { CreateMealItemDto } from './dto/create-mealItem.dto';
import { MealRepository } from './meal.repository';
import { ReqUser } from 'src/types/ReqUser';
import { UpdateMealItemDto } from './dto/update-mealItem.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealService {
    constructor(private readonly repo: MealRepository) {}

    create(user: ReqUser, dto: CreateMealDto) {
        return this.repo.create(user.sub, dto);
    }
    findUserMeals(user: ReqUser) {
        return this.repo.findUserMeals(user.sub);
    }
    updateMeal(mealId: number, dto: UpdateMealDto) {
        return this.repo.update(mealId, dto)
    }
    async updateUserMeal(user: ReqUser, mealId: number, dto: CreateMealDto){
        //check if user owns the meal
        const meal = await this.repo.findByMealId(mealId);
        if(!meal) throw new NotFoundException(`Meal at id=${mealId} not found`);
        if(meal.id != user.sub) throw new ForbiddenException("User does not own this meal");
        return this.repo.update(mealId, dto);
    }
    findUserMealsByTimePeriod(user: ReqUser, startISO: Date, endISO: Date) {
        // ISO 8601: YYYY-MM-DDTHH:MM:SS.sssZ
        return this.repo.findUserMealsByTimePeriod(user.sub, startISO, endISO);
    }

    async deleteUserMeal(user: ReqUser, mealId: number) {
        //check if user owns the meal
        const meal = await this.repo.findByMealId(mealId);
        if(!meal) throw new NotFoundException(`Meal at id=${mealId} not found`);
        if(meal.id != user.sub) throw new ForbiddenException("User does not own this meal");
        return this.repo.delete(mealId)
    }
    async deleteMeal(mealId: number) {
        const meal = await this.repo.findByMealId(mealId);
        if(!meal) throw new NotFoundException(`Meal at id=${mealId} not found`);
        return this.repo.delete(mealId)
    }
    async createMealItem(user: ReqUser, mealId: number, dto: CreateMealItemDto) {
        const meal = await this.repo.findByMealId(mealId);
        if(!meal) return new ForbiddenException(`Meal at id:${mealId} does not exist!`);
        if(meal.userId != user.sub) return new UnauthorizedException(`User at user.id:${user.sub} 
                                                                     does not own meal at meal.id:${meal.userId}`);
        return this.repo.createMealItem(mealId, dto);
    }
    findMealItem(mealItemId: number) {
        return this.repo.findMealItem(mealItemId);
    }
    findMealItemsInMeal(mealId: number) {
        return this.repo.findMealItemsInMeal(mealId);
    }
    updateMealItem(mealId: number, dto: UpdateMealItemDto) {
        return this.repo.updateMealItem(mealId, dto);
    }
    deleteMealItem(mealId: number) {
        return this.repo.deleteMealItem(mealId);
    }
}
