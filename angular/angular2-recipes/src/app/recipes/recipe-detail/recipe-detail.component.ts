import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id:number;

  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=> {
        this.recipe = this.recipesService.getRecipe(params['id']);
        this.id = +params['id'];
      }
    );

  }

  addToShoppingList() {
    this.shoppingListService.addRecipeToShoppingList.next(this.recipe.ingredients);
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);

  }

}
