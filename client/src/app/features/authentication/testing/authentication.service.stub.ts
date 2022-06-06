/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseMockHelper } from 'src/app/core/testing/firebase-mock-helper';
import { FirebaseCredential, FirebaseUser } from 'src/firebase-app';
import { CredentialsModel } from '../models/credentials.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';

/**
 * Authentication service wrapping angular fire. Provides all methods and observables relating to user authentication
 * */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationStubService {
  currentUser$: Observable<FirebaseUser | null>;
  isLoggedIn$: Observable<boolean>;

  //Abstracting away all third-party namespace exported functions.
  get googleAuthProvider(): firebase.auth.AuthProvider {
    return new firebase.auth.GoogleAuthProvider();
  }

  constructor() {
    this.currentUser$ = new Subject();
    this.isLoggedIn$ = this.currentUser$.pipe(map((user: firebase.User | null): boolean => !!user));
  }

  updateCurrentUser: (user: firebase.User | null) => Promise<void> = () => Promise.resolve();

  async registerUser(signInformation: SignInDetailsModel): Promise<void> {
    return Promise.resolve();
  }

  async signIn(credentials: CredentialsModel): Promise<FirebaseCredential> {
    return Promise.resolve(FirebaseMockHelper.userCredentialMock());
  }

  async signOut(): Promise<void> {
    return Promise.resolve();
  }

  async sendEmailVerification(user: FirebaseUser): Promise<void> {
    return Promise.resolve();
  }

  /** Handle the google signup process
   * @returns true if user has completed registration , false otherwise
   */
  async googleSignProcess(): Promise<boolean> {
    return Promise.resolve(true);
  }

  async completeGoogleSignup(uid: string, additionalInfo: Partial<SignInDetailsModel>): Promise<void> {
    return Promise.resolve();
  }

  getUserDocument$(user: FirebaseUser): Observable<Record<string, unknown>> {
    return of({ fakeVar: 'fakeValue' });
  }

  async forgotPassword(email: string): Promise<void> {
    return Promise.resolve();
  }

  errorMessage(key: string): string {
    switch (key) {
      case 'auth/invalid-email':
        return 'The email is invalid';
      case 'auth/invalid-password':
        return 'The password is invalid';
      case 'auth/wrong-password':
        return 'The email or password is wrong';
      case 'auth/user-not-found': //uncatched POST error breaking detection change somewhere
        return 'The email was not found';
      case 'auth/email-already-in-use':
        return 'Email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      default:
        return 'Error';
    }
  }
}
