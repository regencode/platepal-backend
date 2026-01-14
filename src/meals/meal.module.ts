import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MeMealController } from './meal.controller';
import { MealRepository } from './meal.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [MeMealController],
    providers: [MealService, MealRepository],
    exports: [MealRepository]
})
export class MealModule {}
