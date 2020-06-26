import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(0,'Tortilla de patatas',
    'Esto es una descripcion',
    'https://upload.wikimedia.org/wikipedia/commons/5/58/Aloo_chat_Recipe.JPG',
    [
      new Ingredient('Huevos',2),
      new Ingredient('Patatas',4)
     ]),
    new Recipe(1,'Bocadillo de calamares',
    'Esto es una descripcion',
    'https://upload.wikimedia.org/wikipedia/commons/5/58/Aloo_chat_Recipe.JPG',
    [
      new Ingredient('Calamares',12),
      new Ingredient('Ajos',2)
    ])
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());

  }
  getRecipes() {
    //NOTE: we use slice method to return a copy of the array
    return this.recipes.slice();

  }

  getRecipe(recipeId) {
    return this.recipes[recipeId];
  }

  updateRecipe(recipeId , newRecipe: Recipe) {
    this.recipes[recipeId] = newRecipe;
    this.recipes[recipeId].id=recipeId;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(recipeId) {
    this.recipes.splice(recipeId,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    const newId = this.recipes.length-1;
    this.recipes[newId].id=newId;
    this.recipesChanged.next(this.recipes.slice());
  }

}
