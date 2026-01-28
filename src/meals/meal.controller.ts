import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { CreateMealItemDto } from './dto/create-mealItem.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { ReqUser } from 'src/types/ReqUser';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { startOfDay, endOfDay } from 'date-fns';
import { UpdateMealItemDto } from './dto/update-mealItem.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('me/meals')
export class MeMealController {
    constructor(private readonly service: MealService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@CurrentUser() user: ReqUser, @Body() createMealDto: CreateMealDto) {
        return this.service.create(user, createMealDto);
    }


    @Patch(":id")
    @UseGuards(JwtAuthGuard)
    updateMeal(@CurrentUser() user: ReqUser, 
               @Param("id") mealId: number, 
               @Body() dto: UpdateMealDto) {
        return this.service.updateMeal(mealId, dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findUserMealsInDate(@CurrentUser() user: ReqUser, 
                        @Query("date") userDateISO: string, 
                        @Query("timezone") timezone: string ) {
        if(!userDateISO || !timezone) return this.service.findUserMeals(user);
        const localStartISO = startOfDay(new Date(userDateISO));
        const localEndISO = endOfDay(new Date(userDateISO));

        const startUTC = fromZonedTime(localStartISO, timezone);
        const endUTC = fromZonedTime(localEndISO, timezone);
        return this.service.findUserMealsByTimePeriod(user, startUTC, endUTC);
    }


    @Post(":id")
    @UseGuards(JwtAuthGuard)
    createMealItem(@CurrentUser() user: ReqUser, 
                   @Param("id") mealId: number, 
                   @Body() createMealDto: CreateMealItemDto) {
        return this.service.createMealItem(user, mealId, createMealDto);
    }

    @Get(":id")
    findMealItemsInMeal(@Param("id") mealId: number) {
        return this.service.findMealItemsInMeal(mealId);
    }

    @Delete(":id")
    delete(@Param("id") mealId: number) {
        return this.service.deleteMeal(mealId);
    }
}

@Controller("mealItem")
export class MealItemController {
    constructor(private readonly service: MealService) {}

    @Get()
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    findAll() {
        return this.service.findAllMealItems();

    }
    @Get(":id")
    get(@Param("id") mealItemId: number) {
        return this.service.findMealItem(mealItemId);
    }

    @Patch(":id")
    update(@Param("id") mealItemId: number, @Body() dto: UpdateMealItemDto) {
        return this.service.updateMealItem(mealItemId, dto);
    }

    @Delete(":id")
    delete(@Param("id") mealItemId: number) {
        return this.service.deleteMealItem(mealItemId);
    }

}
