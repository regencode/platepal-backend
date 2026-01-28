import { Injectable } from '@nestjs/common';
import { CreateNutritionGoalDto } from './dto/create-nutrition-goal.dto';
import { UpdateNutritionGoalDto } from './dto/update-nutrition-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NutritionGoalRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, dto: CreateNutritionGoalDto) {
    return this.prisma.nutritionGoal.create({
        data: { 
            userId: userId,
            calories_kcal: dto.calories_kcal,
            protein_g: dto.protein_g,
            carbohydrates_g: dto.carbohydrates_g,
            fat_g: dto.fat_g
        }
    });
  }
  update(id: number, dto: UpdateNutritionGoalDto) {
    return this.prisma.nutritionGoal.update({
        where: { id: id },
        data: { ...dto }
    });
  }

  findOne(userId: number) {
    return this.prisma.nutritionGoal.findUnique({
        where: { userId }
    });
  }

  delete(id: number) {
      return this.prisma.nutritionGoal.delete({
          where: { id }
      })
  }
}
