/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirebaseUser } from 'src/firebase-app';

/** This utility class provides numerous mocks useful for stubbing firebase common objects  */
export class FirebaseMockHelper {
  static firebaseUserMock = (): FirebaseUser => {
    return {
      displayName: 'fakeDisplayName',
      email: 'fake@fake.com',
      phoneNumber: null,
      photoURL: null,
      providerId: 'fakeId',
      uid: 'fakeUID',
      updateProfile: (profile: { displayName: string }) => Promise.resolve(),
      sendEmailVerification: () => Promise.resolve(),
      reload: () => Promise.resolve()
    } as FirebaseUser;
  };
}
