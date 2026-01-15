import { PartialType } from "@nestjs/mapped-types";
import { CreateMealItemDto } from "./create-mealItem.dto";

export class UpdateMealItemDto extends PartialType(CreateMealItemDto) {}
