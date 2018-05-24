import { Injectable } from "@angular/core";
import { RecipeService } from "../shared/recipe.service";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../model/recipe.model";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipeResolver implements Resolve<Recipe> {

    constructor(private recipeService: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let id = route.paramMap.get('id');
        if (id !== null) {
            return this.recipeService.editRecipe(+id);
        }
        return this.recipeService.editRecipe(null);
    }
}