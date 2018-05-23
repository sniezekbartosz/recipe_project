import { Recipe } from "./recipe.model";
import { Category } from "./category.model";

export interface EditRecipe {
    recipe: Recipe;
    categories: Category[];
}