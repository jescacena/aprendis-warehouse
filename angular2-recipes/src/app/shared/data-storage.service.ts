import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipesService: RecipesService, private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
      return this.http.put('https://ng-recipe-book-5333b.firebaseio.com/recipes.json?auth='+token,
    this.recipesService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get('https://ng-recipe-book-5333b.firebaseio.com/recipes.json?auth='+token)
    .map(
      (response: Response)=> {
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes) {
          if(!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    )
    .catch(
      (error: Response) => {
        console.log(error);
        // return Observable.throw('Something went wrong');
        return Observable.throw(error);

      }
    )
    .subscribe(
      (recipes: Recipe[])=> {
        this.recipesService.setRecipes(recipes.slice());
      }
    );
  }

}
