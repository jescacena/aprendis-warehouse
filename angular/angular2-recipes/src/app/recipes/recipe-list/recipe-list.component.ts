import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipesService: RecipesService,
    private route: ActivatedRoute ,
    private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  gotoNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
