import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/core/utilities/utils';
import { FirebaseCredential, FirebaseUser } from 'src/firebase-app';
import { CredentialsModel } from '../models/credentials.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';

/**
 * Authentication service wrapping angular fire. Provides all methods and observables relating to user authentication
 * */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$: Observable<FirebaseUser | null>;
  isLoggedIn$: Observable<boolean>;

  //Abstracting away all third-party namespace exported functions.
  get googleAuthProvider(): firebase.auth.AuthProvider {
    return new firebase.auth.GoogleAuthProvider();
  }

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afStore: AngularFirestore
  ) {
    this.currentUser$ = this.afAuth.user;
    this.isLoggedIn$ = this.currentUser$.pipe(map((user: firebase.User | null): boolean => !!user));
  }

  updateCurrentUser: (user: firebase.User | null) => Promise<void> = this.afAuth.updateCurrentUser;

  async registerUser(signInformation: SignInDetailsModel): Promise<void> {
    return this.afAuth
      .createUserWithEmailAndPassword(signInformation.email, signInformation.password)
      .then(userCredential => {
        if (!userCredential.user) {
          return Promise.reject(new Error("Can't create a profile from a null user object"));
        }
        return this._setUserData(userCredential.user, signInformation);
      });
  }

  async signIn(credentials: CredentialsModel): Promise<FirebaseCredential> {
    return this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
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
    return this.afAuth.signInWithPopup(this.googleAuthProvider).then(userCredential => {
      const user = userCredential.user;
      if (!user) {
        return Promise.reject(new Error("Can't create a profile from a null user object"));
      }
      //if its a new user -> create the field : completeRegistration -> redirect to google sign up
      if (userCredential.additionalUserInfo?.isNewUser) {
        return this._setCompleteRegistration(user);
      }

      //if its not a new user -> get the data and verify the field -> ok : go to home page , otherwise go to google signup
      const userRef = this.afStore.doc(`users/${user.uid}`);

      return new Promise((resolve, reject) => {
        userRef.get().subscribe({
          next: (userDocument: firebase.firestore.DocumentSnapshot<unknown>) => {
            const data = userDocument.data() as { completeRegistration: boolean } | undefined;
            resolve(!!(data && data.completeRegistration) || this._setCompleteRegistration(user));
          },
          error: reject
        });
      });
    });
  }

  async completeGoogleSignup(
    uid: string,
    additionalInfo: Partial<SignInDetailsModel>
  ): Promise<void> {
    const newDob = new Date(
      additionalInfo.birthYear ?? 0,
      (additionalInfo.birthMonth ?? 0) - 1,
      additionalInfo.birthDay ?? 0
    );
    if (!this._verifyDate(newDob)) return Promise.reject(new Error('Date of birth is invalid'));

    const userRef = this.afStore.doc(`users/${uid}`);
    const userData = {
      completeRegistration: true,
      ...Utils.omit(['birthDay', 'birthMonth', 'birthYear'], additionalInfo),
      dateOfBirth: newDob
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  getUserDocument$(user: FirebaseUser): Observable<Record<string, unknown>> {
    return this.afStore
      .doc(`users/${user.uid}`)
      .get()
      .pipe(map(docSnapshot => docSnapshot.data() as Record<string, unknown>));
  }

  async forgotPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
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

  private _setUserData(user: FirebaseUser, signInformation: SignInDetailsModel): Promise<void> {
    //Mounting and verifying DOB
    const newDob = new Date(
      signInformation.birthYear,
      signInformation.birthMonth - 1,
      signInformation.birthDay
    );
    if (!this._verifyDate(newDob)) return Promise.reject(new Error('Date of birth is invalid'));

    void user.updateProfile({ displayName: signInformation.name });
    void user.sendEmailVerification();

    const userRef = this.afStore.doc(`users/${user.uid}`);
    const userData = {
      ...Utils.omit(['birthDay', 'birthMonth', 'birthYear'], signInformation),
      dateOfBirth: newDob
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  private _verifyDate(dateToVerify: Date): boolean {
    const minDate = Number(new Date(1900, 0)); //year 1900
    const maxDate = Number(new Date());

    return Number(dateToVerify) > minDate && Number(dateToVerify) < maxDate;
  }

  private async _setCompleteRegistration(user: FirebaseUser): Promise<boolean> {
    const userRef = this.afStore.doc(`users/${user.uid}`);
    const userData = {
      email: user.email,
      completeRegistration: false
    };
    await userRef.set(userData, { merge: true });
    return false;
  }
}
