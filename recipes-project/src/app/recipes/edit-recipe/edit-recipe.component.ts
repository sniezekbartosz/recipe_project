import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../model/ingredient.model';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../../shared/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, RecipeDTO } from '../../model/recipe.model';
import { Category } from '../../model/category.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../../auth/token.service';
import { EditRecipe } from '../../model/editrecipe.model';

const helper = new JwtHelperService();
const name = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  private recipeId: number;
  editMode = false;
  private recipe: Recipe;
  private editRecipe: EditRecipe;
  submitButton: string = '';
  catName: string;

  categories: Category[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private token: TokenService, private router: Router) { }

  // ngOnInit() {
  //   this.route.params.subscribe(
  //     params => {
  //       this.editMode = params['id'] != null;
  //       if (this.editMode) {
  //         this.recipeId = +params['id'];
  //       }
  //       this.initFormGroup();
  //       console.log(this.editMode);
  //       console.log(this.recipeId);
  //     }
  //   );
  // }

  ngOnInit() {
    this.editMode = this.route.snapshot.data['recipe'].recipe !== null;
    this.submitButton = this.editMode ? 'Zaktualizuj przepis' : 'Dodaj przepis';
    this.initFormGroup();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'ingredientId': new FormControl(0),
        'name': new FormControl('', Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    if ((<FormArray>this.recipeForm.get('ingredients')).length > 1) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
  }

  initFormGroup() {
    const decodedToken = helper.decodeToken(this.token.getToken());
    this.editRecipe = this.route.snapshot.data.recipe;
    this.categories = this.route.snapshot.data.recipe.categories;
    //console.log(this.editRecipe);
    //console.log(decodedToken);
    let recipeId = 0;
    let title = '';
    let desc = '';
    let author = decodedToken[name];
    let added = new Date().toDateString();
    const imgPath = '';
    let ingredients = new FormArray([]);
    let category = this.categories[0];
    if (!this.editMode) {
      ingredients.push( new FormGroup({
        'ingredientId': new FormControl(0),
        'name': new FormControl('', Validators.required),
        'recipeId': new FormControl(0)
      }));
    }
    if (this.editMode) {
      //console.log(this.route.snapshot.data.recipe);
      
      recipeId = this.editRecipe.recipe.recipeId;
      title = this.editRecipe.recipe.title;
      desc = this.editRecipe.recipe.description;
      author = this.editRecipe.recipe.author;
      added = this.editRecipe.recipe.added;

      if (this.editRecipe.recipe.ingredients) {
        for (let ing of this.editRecipe.recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'ingredientId': new FormControl(ing.ingredientId),
              'name': new FormControl(ing.name, Validators.required),
              'recipeId': new FormControl(ing.recipeId)
            })
          );
        }
      }
      category = this.editRecipe.recipe.category;

    }

    this.recipeForm = new FormGroup({
      'recipeId': new FormControl(recipeId),
      'title': new FormControl(title, [Validators.minLength(6), Validators.maxLength(100), Validators.required]),
      'description': new FormControl(desc, [Validators.minLength(1), Validators.maxLength(2500), Validators.required]),
      'author': new FormControl(author, Validators.required),
      'added': new FormControl(added),
      'ingredients': ingredients,
      'categoryId': new FormControl(category.categoryId, Validators.required),
      'imgPath': new FormControl(imgPath)
    });

  }

  get categoryName(): string {
    return this.recipeForm.get('category').value;
  }

  get ingredientData() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get categoryData() {
    return this.recipeForm.get('categories') as FormArray;
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      if (this.editMode) {
        this.recipeService.updateRecipe(this.recipeForm.value).subscribe(
          data => {
            this.router.navigate(['/przepisy/' + data.recipeId]);
          }
        );
      } else {
        this.recipeService.addRecipe(this.recipeForm.value).subscribe(
          data => {
            this.router.navigate(['/przepisy/' + data.recipeId]);
          }
        );
      }
    }

  }

  check() {
    console.log(this.recipeForm.value);
  }
}
