import { Controller, Get, Post, Body, Injectable, UseGuards } from '@nestjs/common';
import { NutritionGoalService } from './nutrition-goal.service';
import { CreateNutritionGoalDto } from './dto/create-nutrition-goal.dto';
import { UpdateNutritionGoalDto } from './dto/update-nutrition-goal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReqUser } from 'src/types/ReqUser';

@Injectable()
export class NutritionGoalRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, dto: CreateNutritionGoalDto) {
    return this.prisma.nutritionGoal.create({
        data: { userId: userId, ...dto }
    });
  }
  update(id: number, dto: UpdateNutritionGoalDto) {
    return this.prisma.nutritionGoal.update({
        where: {id: id},
        data: { ...dto }
    });
  }

  findOne(userId: number) {
    return this.prisma.nutritionGoal.findUnique({
        where: { userId }
    });
  }

}
