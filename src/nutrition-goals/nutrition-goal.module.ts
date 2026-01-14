import { Module } from '@nestjs/common';
import { NutritionGoalService } from './nutrition-goal.service';
import { MeNutritionGoalController } from './nutrition-goal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NutritionGoalRepository } from './nutrition-goal.repository';

@Module({
    imports: [PrismaModule],
    controllers: [MeNutritionGoalController],
    providers: [NutritionGoalService, NutritionGoalRepository],
})
export class NutritionGoalModule {}
