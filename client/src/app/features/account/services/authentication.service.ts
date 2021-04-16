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
  userData: firebase.default.User | null = null;

  constructor(private afAuth: AngularFireAuth, public afStore: AngularFirestore) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData)); //typescript variable to access web cache
        JSON.parse(localStorage.getItem('user') ?? '');
      } else {
        localStorage.setItem('user', '');
        JSON.parse(localStorage.getItem('user') ?? '');
      }
    });
  }

  async registerUser(credentials: SignInDetailsModel): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredential) => {
        const registeredUser: firestore.defualt.User | null = userCredential.user;
        void userCredential.user?.updateProfile({ displayName: credentials.name });
        void userCredential.user?.sendEmailVerification();
        void this._setUserData(userCredential.user);
      })
      .catch((error) => {
        console.log('er', error);
      });
  }

  async signIn(credentials: CredentialsModel): Promise<UserModel> {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => ({ gender: 'lol' } as UserModel));
  }

  async forgotPassword(passwordResetEmail: any): Promise<void> {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.log('er', error);
      });
  }

  private _setUserData(user: firebase.default.User) {
    const userRef: AngularFirestoreDocument<firebase.default.User> = this.afStore.doc(`users/${user.uid}`);
    const userData: firebase.default.User = {
      ...user
    };

    return userRef.set(userData, {
      merge: true
    });
  }
}
