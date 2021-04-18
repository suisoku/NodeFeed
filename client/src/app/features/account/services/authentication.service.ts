/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserModel } from 'src/app/core/models/user.model';
import { CredentialsModel } from '../models/credentials.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth, public afStore: AngularFirestore) {
    this._setUserCache();
  }

  async registerUser(signInformation: SignInDetailsModel): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(signInformation.email, signInformation.password)
      .then((userCredential) => {
        if (!userCredential.user) {
          return Promise.reject(new Error("Can't create a profile from a null user object"));
        }
        return this._setUserData(userCredential.user, signInformation);
      })
      .catch((error) => {
        console.log('er', error);
      });
  }

  async signIn(credentials: CredentialsModel): Promise<UserModel> {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => ({ gender: 'lol' } as UserModel));
  }

  private _setUserData(user: firebase.default.User, signInformation: SignInDetailsModel): Promise<void> {
    void user.updateProfile({ displayName: signInformation.name });
    void user.sendEmailVerification();
    const userRef: AngularFirestoreDocument<firebase.default.User> = this.afStore.doc(`users/${user.uid}`);
    const userData: firebase.default.User = {
      ...user
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  private _setUserCache(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); //typescript variable to access web cache
        JSON.parse(localStorage.getItem('user') ?? '');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') ?? '');
      }
    });
  }
}
