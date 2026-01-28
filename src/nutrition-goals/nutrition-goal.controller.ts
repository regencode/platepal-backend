import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { NutritionGoalService } from './nutrition-goal.service';
import { CreateMyNutritionGoalDto, CreateNutritionGoalDto, CreateNutritionGoalWithUserDto } from './dto/create-nutrition-goal.dto';
import { UpdateNutritionGoalDto } from './dto/update-nutrition-goal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { ReqUser } from 'src/types/ReqUser';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('me/nutrition-goals')
export class MeNutritionGoalController {
    constructor(private readonly service: NutritionGoalService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@CurrentUser() user: ReqUser, @Body() dto: CreateNutritionGoalDto) {
        return this.service.create(user.sub, dto);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    update(@CurrentUser() user: ReqUser, @Body() dto: UpdateNutritionGoalDto) {
        return this.service.updateUserNutritionGoal(user.sub, dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findUserNutritionGoal(@CurrentUser() user: ReqUser) {
        return this.service.find(user.sub);
    }

}

@Controller('nutrition-goals')
export class NutritionGoalController {
    constructor(private readonly service: NutritionGoalService) {}

    @Post()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    create(@Body() dto: CreateNutritionGoalWithUserDto) {
        if(!dto.userId) throw new BadRequestException("request body must contain userId");
        return this.service.create(dto.userId, dto);
    }

    @Patch(":id")
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    update(@Param("id") id: number, @Body() dto: UpdateNutritionGoalDto) {
        return this.service.update(id, dto);
    }

    @Delete(":id")
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    delete(@Param("id") id: number) {
        return this.service.delete(id);
    }
}


