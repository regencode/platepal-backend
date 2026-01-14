/*
  Warnings:

  - You are about to drop the column `calories` on the `NutritionGoal` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrates` on the `NutritionGoal` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `NutritionGoal` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `NutritionGoal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NutritionGoal" DROP COLUMN "calories",
DROP COLUMN "carbohydrates",
DROP COLUMN "fat",
DROP COLUMN "protein",
ADD COLUMN     "calories_kcal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "carbohydrates_g" INTEGER DEFAULT 0,
ADD COLUMN     "fat_g" INTEGER DEFAULT 0,
ADD COLUMN     "protein_g" INTEGER DEFAULT 0;
