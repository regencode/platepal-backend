import { Injectable } from "@nestjs/common";
import { CreateMealDto } from "./dto/create-meal.dto";
import { UpdateMealDto } from "./dto/update-meal.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MealTime } from "generated/prisma/enums";
import { CreateMealItemDto } from "./dto/create-mealItem.dto";

@Injectable()
export class MealRepository {
    constructor(private readonly prisma: PrismaService) {}

    create(userId: number, dto: CreateMealDto) {
        return this.prisma.meal.create({
            data: { userId: userId, name: dto.name }
        });
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
    findByMealId(mealId: number) {
        return this.prisma.meal.findUnique({
            where: { id: mealId }
        })
    }

    createMealItem(mealId: number, dto: CreateMealItemDto) {
        return this.prisma.mealItem.create({
            data: { mealId: mealId, ...dto }
        });
    }

    findMealItems(mealId: number) {
        return this.prisma.mealItem.findMany({
            where: {mealId: mealId}
        })
    }


}
