import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private mySubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  onEditItem(index:number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.mySubscription = this.shoppingListService.ingredientAdded.subscribe(
      (ingredient: Ingredient) => {
        // this.shoppingListService.addIngredient(ingredient);
        this.ingredients.push(ingredient);

      }
    );


    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.shoppingListService.addRecipeToShoppingList.subscribe(
      (ingredients: Ingredient[]) => {
        this.shoppingListService.addRecipeIngredients(ingredients);
      }
    );

    this.shoppingListService.shoppingListChanged.subscribe(
      (ingredients: Ingredient[]) => {
        // this.shoppingListService.addIngredient(ingredient);
        this.ingredients = ingredients;
      }
    );
  }

}
