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

  it('calls registerUser which calls createUserWithEmailAndPassword', () => {
    const signInformation = { email: 'abc@abc.fr', password: 'abc' } as SignInDetailsModel;
    angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve({} as FirebaseCredential));
    service.registerUser(signInformation).catch(() => ({}));

    expect(angularFireAuth.createUserWithEmailAndPassword).toHaveBeenCalledOnceWith(
      signInformation.email,
      signInformation.password
    );
  });

  it('calls registerUser with nominal signInDetails object', () => {
    const signInformation: SignInDetailsModel = {
      email: 'abc@abc.fr',
      password: 'abc',
      birthDay: 1,
      birthMonth: 10,
      birthYear: 1996,
      gender: 'Male',
      name: 'Nour'
    };

    const userMock = {
      email: 'fakeUser@abc.com',
      updateProfile: (profile: { displayName: string }) => Promise.resolve(),
      sendEmailVerification: () => Promise.resolve()
    } as FirebaseUser;
    spyOn(userMock, 'updateProfile');

    const userCredential = {
      user: userMock
    } as FirebaseCredential;

    angularFireAuth.createUserWithEmailAndPassword.and.returnValue(Promise.resolve(userCredential));
    angularFireStore.doc.and.returnValue(({
      set: () => Promise.resolve()
    } as unknown) as AngularFirestoreDocument<SignInDetailsModel>);

    //act
    service.registerUser(signInformation);

    //evaluate
    expect(angularFireAuth.createUserWithEmailAndPassword).toHaveBeenCalledOnceWith(
      signInformation.email,
      signInformation.password
    );
    console.log((userMock.updateProfile as any).calls.any()); //it fires corect type of result , so the problem must be async cycles.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect((userMock.updateProfile as any).calls.any()).toHaveBeenCalledTimes(1);
    // I expect that an email verification is sent
    // I expect to have correct document
    // Expect user doc methods being called

    //2 considerations you need the whole function to exectue successfull
    //catch exceptions  + mock everything that is left to mock
    // async cycles to handle
  });

  it('calls registerUser case2', () => {
    //
  });

  it('calls signIn which calls angular fire sign in', () => {
    const signInformation = { email: 'abc@abc.fr', password: 'abc' } as CredentialsModel;

    service.signIn(signInformation);

    expect(angularFireAuth.signInWithEmailAndPassword).toHaveBeenCalledOnceWith(signInformation.email, signInformation.password);
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
