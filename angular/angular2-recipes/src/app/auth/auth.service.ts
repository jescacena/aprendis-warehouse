import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  isAuthenticated() {
      return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
    .then(
      (token:string) => {
        this.token = token;
      }
    );
    return this.token;
  }
  signinUser(mail: string, password:string) {

    firebase.auth().signInWithEmailAndPassword(mail, password)
    .then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
        .then(
          (token:string) => {
            this.token = token;
          }
        )
      }
    )
    .catch(
      error => console.log(error)
    );

  }
  signupUser(mail: string, password:string) {

    firebase.auth().createUserWithEmailAndPassword(mail, password)
    .catch(
      error => console.log(error)
    );

  }
}
