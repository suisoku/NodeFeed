/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable rxjs/finnish */
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FirebaseCredential, FirebaseUser } from 'src/firebase-app';
import { CredentialsModel } from '../models/credentials.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';
import { AuthenticationService } from './authentication.service';
import firebase from 'firebase/app';

fdescribe('AuthenticationService', () => {
  let service: AuthenticationService;
  let router: jasmine.SpyObj<Router>; //instance mock
  let angularFireStore: jasmine.SpyObj<AngularFirestore>; //instance mock
  let angularFireAuth: jasmine.SpyObj<AngularFireAuth>; //instance mock

  beforeEach(() => {
    //Mock values
    const fakeUser$ = of([{ user: 'fakeUser' }]);

    // Mock providers
    const routerProvider = jasmine.createSpyObj('Router', ['collection']);
    const angularFireStoreProvider = jasmine.createSpyObj('AngularFireStore', ['doc']);
    const angularFireAuthProvider = jasmine.createSpyObj(
      'AngularFireAuth',
      ['createUserWithEmailAndPassword', 'signInWithEmailAndPassword', 'signOut', 'signInWithPopup', 'sendPasswordResetEmail'],
      { user: fakeUser$ }
    ); //provider mock

    //spyOnProperty(angularFireAuthProvider, 'user', 'get').and.returnValue(() => fakeUser$);

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerProvider },
        { provide: AngularFirestore, useValue: angularFireStoreProvider },
        { provide: AngularFireAuth, useValue: angularFireAuthProvider }
      ]
    });

    // injected instance mocks
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    angularFireStore = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    angularFireAuth = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;

    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Sign in methods suite [registerUser() , GoogleSignProcess()]', () => {
    let signInformationMock: SignInDetailsModel;
    let userMock: FirebaseUser;
    let userCredentialMock: FirebaseCredential;

    beforeEach(() => {
      signInformationMock = {
        email: 'abc@abc.fr',
        password: 'abc',
        birthDay: 1,
        birthMonth: 10,
        birthYear: 1996,
        gender: 'Male',
        name: 'Nour'
      };

      userMock = {
        email: 'fakeUser@abc.com',
        updateProfile: (profile: { displayName: string }) => Promise.resolve(),
        sendEmailVerification: () => Promise.resolve()
      } as FirebaseUser;

      spyOn(userMock, 'updateProfile');
      spyOn(userMock, 'sendEmailVerification');

      userCredentialMock = {
        user: userMock
      } as FirebaseCredential;
    });

    /**  RegisterUser tests section */

    it('calls registerUser which calls createUserWithEmailAndPassword and throws user null', async () => {
      angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve({} as FirebaseCredential));

      await expectAsync(service.registerUser(signInformationMock)).toBeRejectedWith(
        new Error("Can't create a profile from a null user object")
      );
      expect(angularFireAuth.createUserWithEmailAndPassword).toHaveBeenCalledOnceWith(
        signInformationMock.email,
        signInformationMock.password
      );
    });

    it('calls registerUser with nominal signInDetails object with success', async () => {
      angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(userCredentialMock));

      const docSetSpy = jasmine.createSpy();
      angularFireStore.doc.and.returnValue(({
        set: docSetSpy
      } as unknown) as AngularFirestoreDocument<SignInDetailsModel>);

      //act
      await service.registerUser(signInformationMock);

      //expectations
      const expectedUserData = {
        email: signInformationMock.email,
        password: signInformationMock.password,
        gender: signInformationMock.gender,
        name: signInformationMock.name,
        dateOfBirth: new Date(1996, 9, 1)
      };

      //evaluate
      expect(angularFireAuth.createUserWithEmailAndPassword).toHaveBeenCalledOnceWith(
        signInformationMock.email,
        signInformationMock.password
      );
      expect(userMock.updateProfile).toHaveBeenCalledTimes(1);
      expect(userMock.sendEmailVerification).toHaveBeenCalledTimes(1);
      expect(angularFireStore.doc).toHaveBeenCalledTimes(1);
      expect(docSetSpy).toHaveBeenCalledOnceWith(expectedUserData, jasmine.any(Object));
    });

    const faultyDOBSubSuite = [
      { description: 'below min year', inputYear: 1888 },
      { description: 'above max year', inputYear: 3888 }
    ];

    faultyDOBSubSuite.forEach((params) =>
      it(`calls registerUser with a faulty DOB ${params.description} `, async () => {
        signInformationMock.birthYear = params.inputYear;
        angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(userCredentialMock));
        // act and evaluate
        await expectAsync(service.registerUser(signInformationMock)).toBeRejectedWith(new Error('Date of birth is invalid'));
      })
    );

    /** GoogleSignProcess tests section */

    it('calls googleSignProcess with no user and should return Reject promise', async () => {
      angularFireAuth.signInWithPopup.and.returnValue(Promise.resolve({ user: null } as FirebaseCredential));

      // act and evaluate
      await expectAsync(service.googleSignProcess()).toBeRejectedWith(
        new Error("Can't create a profile from a null user object")
      );
      expect(angularFireAuth.signInWithPopup).toHaveBeenCalledTimes(1);
    });
  });

  it('calls signIn which calls angular fire sign in', () => {
    const signInformationMock = { email: 'abc@abc.fr', password: 'abc' } as CredentialsModel;
    spyOn(firebase.auth, 'GoogleAuthProvider').and.returnValue({} as firebase.auth.GoogleAuthProvider);

    service.signIn(signInformationMock);

    expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledOnceWith(
      signInformationMock.email,
      signInformationMock.password
    );
  });

  it('calls signout which calls angular fire sign out', () => {
    service.signOut();

    expect(angularFireAuth.signOut).toHaveBeenCalledTimes(1);
  });

  it('calls sendEmailVerification by using method of input parameter (user)', () => {
    const user = jasmine.createSpyObj('user', ['sendEmailVerification']);

    service.sendEmailVerification(user);

    expect(user.sendEmailVerification).toHaveBeenCalledTimes(1);
  });
});
