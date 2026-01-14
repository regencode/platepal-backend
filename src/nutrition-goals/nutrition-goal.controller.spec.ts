import { Test, TestingModule } from '@nestjs/testing';
import { NutritionGoalController } from './nutrition-goal.controller';
import { NutritionGoalService } from './nutrition-goal.service';

describe('NutritionGoalController', () => {
  let controller: NutritionGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutritionGoalController],
      providers: [NutritionGoalService],
    }).compile();

    controller = module.get<NutritionGoalController>(NutritionGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
