/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { CredentialsModel } from '../models/credentials.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';
import firebase from 'firebase/app';
import { map, max } from 'rxjs/operators';
import { FirebaseUser } from 'src/firebase-app';
import { Utils } from 'src/app/core/utilities/utils';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$: Observable<FirebaseUser | null>;
  isLoggedIn$: Observable<boolean>;

  constructor(private readonly afAuth: AngularFireAuth, private readonly afStore: AngularFirestore, private _router: Router) {
    this.currentUser$ = this.afAuth.user;
    this.isLoggedIn$ = this.currentUser$.pipe(map((user: firebase.User | null): boolean => !!user));
  }

  updateCurrentUser: (user: firebase.User | null) => Promise<void> = this.afAuth.updateCurrentUser;

  async registerUser(signInformation: SignInDetailsModel): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(signInformation.email, signInformation.password).then((userCredential) => {
      return this.setUserData(userCredential.user, signInformation);
    });
  }

  async signIn(credentials: CredentialsModel): Promise<UserModel> {
    return this.afAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => ({ gender: 'lol' } as UserModel));
  }

  async signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  async sendEmailVerification(user: FirebaseUser): Promise<void> {
    return user.sendEmailVerification();
  }

  /** Handle the google signup process
   * @returns true if user has completed registration , false otherwise
   */
  async googleSignProcess(): Promise<boolean> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider).then((userCredential) => {
      const user = userCredential.user;
      if (!user) {
        return Promise.reject(new Error("Can't create a profile from a null user object"));
      }
      console.log("tsting", userCredential.additionalUserInfo);
      //if its a new user -> create the field : completeRegistration -> redirect to google sign up
      if (userCredential.additionalUserInfo?.isNewUser) {
        return this._completeRegistration(user);
      }

      //if its not a new user -> get the data and verify the field -> ok : go to home page , otherwise go to google signup
      const userRef = this.afStore.doc(`users/${user.uid}`);

      return new Promise((resolve, reject) => {
        userRef.get().subscribe({
          next: (userDocument: firebase.firestore.DocumentSnapshot<unknown>) => {
            const data = userDocument.data() as { completeRegistration: boolean } | undefined;
            resolve(!!(data && data.completeRegistration) || this._completeRegistration(user));
          },
          error: reject
        });
      });
    });
  }

  async setUserData(user: FirebaseUser | null, signInformation: SignInDetailsModel): Promise<void> {
    if (!user) {
      return Promise.reject(new Error("Can't create a profile from a null user object"));
    }
    return this._setUserData(user, signInformation);
  }

  private _setUserData(user: FirebaseUser, signInformation: SignInDetailsModel): Promise<void> {
    //Mounting and verifying DOB
    const newDob = new Date(signInformation.birthYear, signInformation.birthMonth, signInformation.birthDay);
    if (!this._verifyDate(newDob)) throw new Error('Date of birth is invalid');

    void user.updateProfile({ displayName: signInformation.name });
    void user.sendEmailVerification();

    const userRef = this.afStore.doc(`users/${user.uid}`);
    const userData = {
      ...Utils.omit(['birthDay', 'birthMonth', 'birthYear'], signInformation),
      dateOfBirth: newDob
    };
    console.log('you are a genius', userData);
    return userRef.set(userData, {
      merge: true
    });
  }

  private _verifyDate(dateToVerify: Date): boolean {
    const minDate = Number(new Date(1900, 0)); //year 1900
    const maxDate = Number(new Date());

    return Number(dateToVerify) > minDate && Number(dateToVerify) < maxDate;
  }

  private _completeRegistration(user: FirebaseUser): Promise<boolean> {
    const userRef = this.afStore.doc(`users/${user.uid}`);
    const userData = {
      email: user.email,
      completeRegistration: false
    };

    console.log('you are a genius', userData);
    return userRef.set(userData, { merge: true }).then(() => false);
  }
}
