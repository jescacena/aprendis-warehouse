import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';

import { RecipesService } from '../recipes.service';

import { Recipe } from '../recipe.model';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params)=> {
        this.id = +params['id'];
        this.editMode = !isNaN(this.id);

        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log('recipeForm' , this.recipeForm);
    const id = (this.editMode)? this.id : this.recipesService.getRecipes().length;
    const newRecipe = new Recipe(
      id,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'] || []
    );

    if(this.editMode) {
      this.recipesService.updateRecipe(this.id , newRecipe);
    } else {
      this.recipesService.addRecipe(newRecipe);
    }

    const target='../'+id;
    this.router.navigate([target], {relativeTo: this.route});

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup( {
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index:number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

  onCancel() {
    this.router.navigate(['recipes']);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
        const recipeToEdit = this.recipesService.getRecipe(this.id);
        recipeName = recipeToEdit.name;
        recipeImagePath = recipeToEdit.imagePath;
        recipeDescription = recipeToEdit.description

        if(recipeToEdit['ingredients']) {
          for(let ingredient of recipeToEdit['ingredients']) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ]),
              })
            );
          }
        }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
