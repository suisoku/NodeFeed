/* eslint-disable rxjs/finnish */
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FirebaseCredential } from 'src/firebase-app';
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
    const angularFireStoreProvider = jasmine.createSpyObj('AngularFireStore', ['collection']);
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
    //
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
