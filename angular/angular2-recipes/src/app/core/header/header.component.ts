import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { RecipesService } from '../../recipes/recipes.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authService2;

  @Output() selectFeature = new EventEmitter<{feature:string}>();
  constructor(private dataStorageService: DataStorageService,
    private recipesService: RecipesService,
    private authService: AuthService) {
      this.authService2 = this.authService;
    }

  ngOnInit() {
  }

  onSelectFeature(feature: string) {
    this.selectFeature.emit({
      feature: feature
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }
  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

}
