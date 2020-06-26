import { Component,OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  oddArray:number[] = [];
  evenArray:number[] = [];

  loadedFeature: string = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCqHQQ7gtNxkERmJzTBDfkn_Sq_2LeY9qc",
      authDomain: "ng-recipe-book-5333b.firebaseapp.com"
    });
  }

  onFeatureSelected(data: {feature: string}) {
    this.loadedFeature = data.feature;
  }

  onStartGameClicked(data: {count: number}) {
    console.log("onStartGameClicked count-" + data.count);
    if(data.count%2===0) {
      this.evenArray.push(data.count);
    } else {
      this.oddArray.push(data.count);
    }
  }
}
