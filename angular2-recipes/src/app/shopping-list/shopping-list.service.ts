import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientAdded = new Subject<Ingredient>();
  addRecipeToShoppingList = new Subject<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  shoppingListChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Patatas',1),
    new Ingredient('Huevos',2)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index:number) {
    return this.ingredients[index];
  }

  updateIngredient(index:number , ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    let copy = Object.assign({}, this.ingredients);
    this.ingredientsChanged.next(copy);
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addRecipeIngredients(ingredients: Ingredient[]) {
    // this.ingredients = this.ingredients.concat(ingredients);
    this.ingredients.push(...ingredients);
    this.shoppingListChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }


}
