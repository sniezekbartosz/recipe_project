import { Ingredient, IngredientDTO } from './ingredient.model';
import { Category } from './category.model';

export interface Recipe {
    recipeId: number;
    title: string;
    description: string;
    author: string;
    added: string;
    ingredients: Ingredient[];
    category: Category;
    categoryId: number;
    imgPath: string;
}

export interface RecipeDTO {
    recipeId: number;
    title: string;
    description: string;
    author: string;
    added: string;
    ingredients: IngredientDTO[];
    categoryName: string;
    imgPath: string;
}
