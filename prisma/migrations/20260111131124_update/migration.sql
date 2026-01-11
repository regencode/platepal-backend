/*
  Warnings:

  - You are about to drop the column `calories` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrates` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_portion` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `fiber` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `food_name` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `sodium` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `sugar` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `eatenAt` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MealTime" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "calories",
DROP COLUMN "carbohydrates",
DROP COLUMN "estimated_portion",
DROP COLUMN "fat",
DROP COLUMN "fiber",
DROP COLUMN "food_name",
DROP COLUMN "protein",
DROP COLUMN "sodium",
DROP COLUMN "sugar",
DROP COLUMN "uuid",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eatenAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" "MealTime" NOT NULL;

-- CreateTable
CREATE TABLE "MealItem" (
    "id" SERIAL NOT NULL,
    "mealId" INTEGER NOT NULL,
    "food_name" TEXT NOT NULL,
    "estimated_portion" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fiber" INTEGER,
    "sugar" INTEGER,
    "sodium" INTEGER,

    CONSTRAINT "MealItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionGoal" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" INTEGER,
    "carbohydrates" INTEGER,
    "fat" INTEGER,

    CONSTRAINT "NutritionGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionGoal_userId_key" ON "NutritionGoal"("userId");

-- AddForeignKey
ALTER TABLE "MealItem" ADD CONSTRAINT "MealItem_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionGoal" ADD CONSTRAINT "NutritionGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
