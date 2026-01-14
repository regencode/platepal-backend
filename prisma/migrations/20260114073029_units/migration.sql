/*
  Warnings:

  - You are about to drop the column `calories` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrates` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_portion` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `fiber` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `sodium` on the `MealItem` table. All the data in the column will be lost.
  - You are about to drop the column `sugar` on the `MealItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MealItem" DROP COLUMN "calories",
DROP COLUMN "carbohydrates",
DROP COLUMN "estimated_portion",
DROP COLUMN "fat",
DROP COLUMN "fiber",
DROP COLUMN "protein",
DROP COLUMN "sodium",
DROP COLUMN "sugar",
ADD COLUMN     "calories_kcal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "carbohydrates_g" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "estimated_portion_g" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fat_g" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fiber_g" INTEGER DEFAULT 0,
ADD COLUMN     "protein_g" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sodium_mg" INTEGER DEFAULT 0,
ADD COLUMN     "sugar_g" INTEGER DEFAULT 0;
