import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { CreateMealItemDto } from './dto/create-mealItem.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ReqUser } from 'src/types/ReqUser';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { startOfDay, endOfDay } from 'date-fns';

@Controller('me/meals')
export class MeMealController {
    constructor(private readonly service: MealService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@CurrentUser() user: ReqUser, @Body() createMealDto: CreateMealDto) {
        return this.service.create(user, createMealDto);
    }


    @Post(":id")
    @UseGuards(JwtAuthGuard)
    createMealItem(@CurrentUser() user: ReqUser, 
                   @Param("id") mealId: number, 
                   @Body() createMealDto: CreateMealItemDto) {
        return this.service.createMealItem(user, mealId, createMealDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findUserMeals(@CurrentUser() user: ReqUser, @Query("date") userDateISO: string, @Query("timezone") timezone: string ) {
        if(!userDateISO || !timezone) return this.service.findUserMeals(user);
        const localStartISO = startOfDay(new Date(userDateISO));
        const localEndISO = endOfDay(new Date(userDateISO));

        const startUTC = fromZonedTime(localStartISO, timezone);
        const endUTC = fromZonedTime(localEndISO, timezone);
        return this.service.findUserMealsByTimePeriod(user, startUTC, endUTC);
    }

    @Get(":id")
    findMealItems(@Param("id") mealId: number) {
        return this.service.findMealItems(mealId);
    }

}
