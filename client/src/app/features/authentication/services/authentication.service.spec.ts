/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable rxjs/finnish */
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FirebaseCredential, FirebaseUser } from 'src/firebase-app';
import { CredentialsModel } from '../models/credentials.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';
import { AuthenticationService } from './authentication.service';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

fdescribe('AuthenticationService', () => {
  let service: AuthenticationService;
  let router: jasmine.SpyObj<Router>; //instance mock
  let angularFireStore: jasmine.SpyObj<AngularFirestore>; //instance mock
  let angularFireAuth: jasmine.SpyObj<AngularFireAuth>; //instance mock

  // global instance mocks
  let documentMock: DocumentSnapshot<unknown>;

  beforeEach(() => {
    //Mock values
    const fakeUser$ = of([{ user: 'fakeUser' }]);
    documentMock = ({
      data: () => {
        return 'random';
      },
      get: (field: string) => null
    } as unknown) as DocumentSnapshot<unknown>;

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
    let additionalInfo: firebase.auth.AdditionalUserInfo;
    let authProviderMock: firebase.auth.GoogleAuthProvider;
    let docSetSpy: jasmine.Spy;
    let docGetSpy: jasmine.Spy;

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

      additionalInfo = {
        isNewUser: false,
        profile: null,
        providerId: 'id,'
      };

      userCredentialMock = {
        user: userMock,
        additionalUserInfo: additionalInfo
      } as FirebaseCredential;

      docSetSpy = jasmine.createSpy();
      docGetSpy = jasmine.createSpy();
      angularFireStore.doc.and.returnValue(({
        set: docSetSpy,
        get: docGetSpy
      } as unknown) as AngularFirestoreDocument<SignInDetailsModel>);

      authProviderMock = {
        addScope: (scope: string) => ({} as firebase.auth.GoogleAuthProvider),
        providerId: 'id',
        setCustomParameters: (customOAuthParameters) => ({} as firebase.auth.GoogleAuthProvider)
      } as firebase.auth.GoogleAuthProvider;
      spyOnProperty(service, 'googleAuthProvider', 'get').and.returnValue(authProviderMock);
    });

    /**  RegisterUser tests section */

    it('calls registerUser which calls createUserWithEmailAndPassword and throws user null', async () => {
      angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve({} as FirebaseCredential));

      // Act and evaluate
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

        // Act and evaluate
        await expectAsync(service.registerUser(signInformationMock)).toBeRejectedWith(new Error('Date of birth is invalid'));
      })
    );

    /** GoogleSignProcess tests section */

    it('calls googleSignProcess with no user and should return Reject promise', async () => {
      angularFireAuth.signInWithPopup.and.returnValue(Promise.resolve({ user: null } as FirebaseCredential));

      //Acting an evaluating
      await expectAsync(service.googleSignProcess()).toBeRejectedWith(
        new Error("Can't create a profile from a null user object")
      );
      expect(angularFireAuth.signInWithPopup).toHaveBeenCalledTimes(1);
    });

    it('calls googleSignProcess with new user and should set completeRefistration attribute in firestore', async () => {
      additionalInfo.isNewUser = true;
      angularFireAuth.signInWithPopup.and.returnValue(Promise.resolve(userCredentialMock));

      const expectedUserData = {
        email: userCredentialMock.user?.email,
        completeRegistration: false
      };

      //Act
      await service.googleSignProcess();

      expect(angularFireStore.doc).toHaveBeenCalledTimes(1);
      expect(docSetSpy).toHaveBeenCalledOnceWith(expectedUserData, jasmine.objectContaining({ merge: true }));
    });
    it('calls googleSignProcess with old user and completed registration, should return Resolve(true)', async () => {
      // Arrange
      const documentMock = ({
        data: () => {
          return { completeRegistration: true };
        },
        get: (field: string) => null
      } as unknown) as DocumentSnapshot<unknown>;

      angularFireAuth.signInWithPopup.and.returnValue(Promise.resolve(userCredentialMock));
      docGetSpy.and.returnValue(of(documentMock));

      // Act
      const promiseResult: boolean = await service.googleSignProcess();

      // Assert
      expect(angularFireStore.doc).toHaveBeenCalledTimes(1);
      expect(promiseResult).toBe(true);
    });

    const faultyUserDocWithGoogleSignProcess = [
      { description: 'absent user document', input: null },
      { description: 'absent completedRegistration attribute', input: { random: 'random' } },
      { description: 'uncompleted registration', input: { completeRegistration: false } }
    ];

    faultyUserDocWithGoogleSignProcess.forEach((params) =>
      it(`calls googleSignProcess with user and ${params.description}, should complete registration `, async () => {
        // Arrange
        angularFireAuth.signInWithPopup.and.returnValue(Promise.resolve(userCredentialMock));
        docGetSpy.and.returnValue(of(documentMock));

        //Act
        const promiseResult: boolean = await service.googleSignProcess();

        // Assert
        expect(angularFireStore.doc).toHaveBeenCalledTimes(2);
        expect(promiseResult).toBe(false);
      })
    );
    /** CompleteGoogleSignup testing region */

    faultyDOBSubSuite.forEach((params) =>
      it(`calls completeGoogleSignup with a faulty DOB ${params.description} and should reject promise `, async () => {
        signInformationMock.birthYear = params.inputYear;

        // Act and evaluate
        await expectAsync(service.completeGoogleSignup('random', signInformationMock)).toBeRejectedWith(
          new Error('Date of birth is invalid')
        );
      })
    );
    it('calls completeGoogleSignup with nominal signInformation and UID', async () => {
      angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(userCredentialMock));

      //act
      await service.completeGoogleSignup('random', signInformationMock);

      //expectations
      const expectedUserData = {
        completeRegistration: true,
        email: signInformationMock.email,
        password: signInformationMock.password,
        gender: signInformationMock.gender,
        name: signInformationMock.name,
        dateOfBirth: new Date(1996, 9, 1)
      };

      //evaluate
      expect(angularFireStore.doc).toHaveBeenCalledTimes(1);
      expect(docSetSpy).toHaveBeenCalledOnceWith(expectedUserData, jasmine.any(Object));
    });

    it('gets googleAuthProvider and return a AuthProvider', () => {
      const email = 'abc@fr.com';

      //Act
      expect(service.googleAuthProvider).toBeTruthy();
    });
  });

  it('calls signIn which calls angular fire sign in', () => {
    const signInformationMock = { email: 'abc@abc.fr', password: 'abc' } as CredentialsModel;

    // act
    service.signIn(signInformationMock);

    expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledOnceWith(
      signInformationMock.email,
      signInformationMock.password
    );
  });

  it('calls signout which calls angular fire sign out', () => {
    // act
    service.signOut();

    expect(angularFireAuth.signOut).toHaveBeenCalledTimes(1);
  });

  it('calls sendEmailVerification by using method of input parameter (user)', () => {
    const user = jasmine.createSpyObj('user', ['sendEmailVerification']);

    // act
    service.sendEmailVerification(user);

    expect(user.sendEmailVerification).toHaveBeenCalledTimes(1);
  });

  it('calls forgotPassword by using AngularFireAuth', () => {
    const email = 'abc@fr.com';

    //act
    service.forgotPassword(email);

    expect(angularFireAuth.sendPasswordResetEmail).toHaveBeenCalledOnceWith(email);
  });
  // forgotPassword 2 failing tests remaining : auth/invalid-email and auth/user-not-found, you should probably do the same for other fire auth methods

  it('calls errorMessage', () => {
    expect(service.errorMessage('auth/invalid-email')).toBe('The email is invalid');
    expect(service.errorMessage('auth/invalid-password')).toBe('The password is invalid');
    expect(service.errorMessage('auth/wrong-password')).toBe('The email or password is wrong');
    expect(service.errorMessage('auth/user-not-found')).toBe('The email was not found');
    expect(service.errorMessage('auth/email-already-in-use')).toBe('Email already exists');
    expect(service.errorMessage('auth/weak-password')).toBe('Password should be at least 6 characters');
    expect(service.errorMessage('')).toBe('Error');
    expect(service.errorMessage('klkjdsasd78')).toBe('Error');
  });

  it('calls getUserDocument$ and uses firestore functions', () => {
    const firestoreDocument = {
      get: () => of(documentMock)
    } as AngularFirestoreDocument;
    angularFireStore.doc.and.returnValue(firestoreDocument);

    // call through important to delegate behaviour to actual implementation
    spyOn(firestoreDocument, 'get').and.callThrough();

    // act
    service.getUserDocument$({ uid: 'uidFake' } as FirebaseUser).subscribe({
      next: (userDoc) => {
        expect(angularFireStore.doc).toHaveBeenCalled(); //with args not working
        expect(firestoreDocument.get).toHaveBeenCalled();
      }
    });

    //test also final returned observable
  });
});
