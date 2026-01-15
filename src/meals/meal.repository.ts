import { Injectable } from "@nestjs/common";
import { CreateMealDto } from "./dto/create-meal.dto";
import { UpdateMealDto } from "./dto/update-meal.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMealItemDto } from "./dto/create-mealItem.dto";
import { UpdateMealItemDto } from "./dto/update-mealItem.dto";

@Injectable()
export class MealRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(userId: number, dto: CreateMealDto) {
        return this.prisma.meal.create({
            data: { userId: userId, name: dto.name }
        });
    }
    update(mealId: number, dto: UpdateMealDto) {
        return this.prisma.meal.update({
            where: { id: mealId },
            data:  { ...dto }
        })
    }
    findByMealId(mealId: number) {
        return this.prisma.meal.findUnique({
            where: { id: mealId }
        })
    }

    delete(mealId: number) {
        return this.prisma.meal.delete({
            where: { id: mealId },
        })
    }
    
    findUserMeals(userId: number) {
        return this.prisma.meal.findMany({
            where: { userId: userId }
        })
    }

    findUserMealsByTimePeriod(userId: number, start: Date, end: Date) {
        // assume UTC
        return this.prisma.meal.findMany({
            where: { 
                userId: userId, 
                createdAt: {
                    gte: start,
                    lte: end,
                }
            }
        })
    }

    createMealItem(mealId: number, dto: CreateMealItemDto) {
        return this.prisma.mealItem.create({
            data: { mealId: mealId, ...dto }
        });
    }

    findMealItemsInMeal(mealId: number) {
        return this.prisma.mealItem.findMany({
            where: { mealId: mealId }
        })
    }

    findMealItem(mealItemId: number) {
        return this.prisma.mealItem.findUnique({
            where: { id: mealItemId }
        })
    }

    updateMealItem(mealItemId: number, dto: UpdateMealItemDto) {
        return this.prisma.mealItem.update({
            where: { id: mealItemId },
            data:  { ...dto }
        });
    }
    deleteMealItem(mealItemId: number) {
        return this.prisma.mealItem.delete({
            where: { id: mealItemId },
        })
    }

}
