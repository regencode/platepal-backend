import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { LlmModule } from './llm/llm.module';
import { HealthModule } from './health/health.module';
import { MealModule } from './meals/meal.module';
import { NutritionGoalModule } from './nutrition-goals/nutrition-goal.module';
import { MembershipModule } from './membership/membership.module';

@Module({
    imports: [
        PrismaModule, 
        UserModule, 
        AuthModule, 
        LlmModule, 
        HealthModule, 
        MealModule, 
        NutritionGoalModule, 
        MembershipModule,
    ],
        controllers: [AppController],
        providers: [AppService],
})
export class AppModule {}
