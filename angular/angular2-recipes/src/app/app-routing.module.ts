
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes//recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes//recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes//recipe-edit/recipe-edit.component';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule'}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes)
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
