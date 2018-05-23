import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../shared/recipe.service';
import { Recipe } from '../../model/recipe.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  loading = true;
  columns = ['basicInfo', 'author_and_date', 'options'];

  constructor(private recipeService: RecipeService, public dialog: MatDialog) { }
  ngOnInit() {
    this.recipeService.getUserRecipes().subscribe(
      data => {
        this.recipes = data;
        console.log('OK');
        this.loading = false;
      },
      error => {
        console.log('Error occured');
        this.loading = false;
      }
    );
  }

  onDelete(id: number) {
    console.log(id);
    
    this.recipeService.deleteRecipe(id).subscribe((response) => {
    let index = this.recipes.findIndex(r => r.recipeId === id);
    this.recipes.splice(index, 1);
  });
}

}
