import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Recipe } from '../model/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  loading = true;
  columnsToDisplay = ['basicInfo', 'author_and_date'];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.recipeService.getRecipes().subscribe(
      data => {
        this.recipes = data;
        this.loading = false;
      },
      error => {
        //console.log(error);
        this.loading = false;
      }
    );
    // this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
