/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { CredentialsModel } from '../models/credentials.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { FirebaseUser } from 'src/firebase-app';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$: Observable<FirebaseUser | null>;
  isLoggedIn$: Observable<boolean>;

  constructor(private readonly afAuth: AngularFireAuth, private readonly afStore: AngularFirestore) {
    this.currentUser$ = this.afAuth.user;
    this.isLoggedIn$ = this.currentUser$.pipe(map((user: firebase.User | null): boolean => !!user));
  }

  tokenChanged$(callback: (user: FirebaseUser | null) => void): void {
    void this.afAuth.onIdTokenChanged(callback);
  }

  async registerUser(signInformation: SignInDetailsModel): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(signInformation.email, signInformation.password).then((userCredential) => {
      if (!userCredential.user) {
        return Promise.reject(new Error("Can't create a profile from a null user object"));
      }
      return this._setUserData(userCredential.user, signInformation);
    });
  }

  async signIn(credentials: CredentialsModel): Promise<UserModel> {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => ({ gender: 'lol' } as UserModel));
  }

  async signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  async sendEmailVerification(user: FirebaseUser): Promise<void> {
    return user.sendEmailVerification();
  }

  private _setUserData(user: firebase.User, signInformation: SignInDetailsModel): Promise<void> {
    void user.updateProfile({ displayName: signInformation.name });
    void user.sendEmailVerification();
    const userRef = this.afStore.doc(`users/${user.uid}`);
    const userData = {
      ...signInformation
    };

    return userRef.set(userData, {
      merge: true
    });
  }
}
