import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../shared/recipe.service';
import { Recipe, RecipeDTO } from '../../model/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: RecipeDTO;
  loading = true;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    //console.log(id);
    this.recipeService.getRecipe(id).subscribe(
      data => {
        this.recipe = data;
        this.loading = false;
      },
      error => {
        this.recipe = null;
        this.loading = false;
      }
    );
  }

}
