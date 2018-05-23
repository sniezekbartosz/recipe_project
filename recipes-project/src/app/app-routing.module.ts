import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipesComponent } from './recipes/recipes.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { DownloadDatabaseComponent } from './download-database/download-database.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { UserRecipesComponent } from './recipes/user-recipes/user-recipes.component';
import { RecipeResolver } from './resolvers/recipe.resolver';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'przepisy', component: RecipesComponent },
    { path: 'przepisy/nowy-przepis', component: EditRecipeComponent, canActivate: [AuthGuard], resolve: {
        recipe: RecipeResolver
    } },
    { path: 'przepisy/:id', component: RecipeDetailsComponent },
    // { path: 'baza-przepisow', component: DownloadDatabaseComponent, canActivate: [AuthGuard] },
    { path: 'moje-przepisy', component: UserRecipesComponent, canActivate: [AuthGuard] },
    { path: 'moje-przepisy/edytuj/:id', component: EditRecipeComponent, canActivate: [AuthGuard], resolve: {
        recipe: RecipeResolver
    } },
    { path: 'rejestracja', component: RegisterComponent },
    { path: 'logowanie', component: LoginComponent },
    { path: 'ustawienia-konta', component: AccountSettingsComponent, canActivate: [AuthGuard] },
    { path: 'pomoc', component: AboutComponent },
    { path: '**', component: HomeComponent }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }