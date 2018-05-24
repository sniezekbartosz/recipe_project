import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe, RecipeDTO } from '../model/recipe.model';
import { HttpClient } from '@angular/common/http';
import { EditRecipe } from '../model/editrecipe.model';

const url = '../dummy-data/recipes.json/';
const url2 = 'http://localhost:5000/api/recipes';

@Injectable()
export class RecipeService {
  recipeSubject: Subject<Recipe[]> = new Subject();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<Recipe[]>(url2);
   // return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.http.get<RecipeDTO>(url2 + '/' + id);
  }

  getUserRecipes() {
    return this.http.get<Recipe[]>(url2 +  '/GetAllUserRecipes');
  }

  addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(url2, recipe);
    // console.log(recipe);
    // this.recipes.push(recipe);
    // console.log(this.recipes);
    // this.recipeSubject.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe) {
    return this.http.put<Recipe>(url2 + '/' + recipe.recipeId, recipe);
    // let index = this.recipes.findIndex(r => r.recipeId == recipe.recipeId);
    // this.recipes[index] = recipe;
    // this.recipeSubject.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    return this.http.delete(url2 + '/' + id).map((response: Response) => response);
    // let index = this.recipes.findIndex(r => r.recipeId === id);
    // this.recipes.splice(index, 1);
    // this.recipeSubject.next(this.recipes.slice());
  }

  editRecipe(id: number) {
    return this.http.get<EditRecipe>(url2 + '/editrecipe/' + id);
  }

}
