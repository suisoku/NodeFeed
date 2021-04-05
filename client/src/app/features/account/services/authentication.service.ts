/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CredentialsModel } from '../models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}

  createUser(credentials: CredentialsModel): void {
    this.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log('er', error);
      });
  }

  signIn(credentials: CredentialsModel): void {
    console.log("s", credentials);
    this.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log('er', error);
      });
  }
}
