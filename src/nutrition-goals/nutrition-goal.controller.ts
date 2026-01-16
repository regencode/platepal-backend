import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NutritionGoalService } from './nutrition-goal.service';
import { CreateNutritionGoalDto } from './dto/create-nutrition-goal.dto';
import { UpdateNutritionGoalDto } from './dto/update-nutrition-goal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { ReqUser } from 'src/types/ReqUser';

@Controller('me/nutrition-goals')
export class MeNutritionGoalController {
  constructor(private readonly service: NutritionGoalService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: ReqUser, @Body() dto: CreateNutritionGoalDto) {
    return this.service.create(user, dto);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@CurrentUser() user: ReqUser, @Body() dto: UpdateNutritionGoalDto) {
    return this.service.updateUserNutritionGoal(user, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findUserNutritionGoal(@CurrentUser() user: ReqUser) {
    return this.service.find(user);
  }

}

@Controller('nutrition-goals')
export class NutritionGoalController {
  constructor(private readonly service: NutritionGoalService) {}

  @Delete(":id")
  delete(@Param("id") id: number) {
      return this.service.delete(id);
  }
}


