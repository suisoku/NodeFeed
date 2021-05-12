/**
 * Firebase custom exports to decouple the namespace changes between Firestore and the app
 */

import firebase from 'firebase/app';
export type FirebaseUser = firebase.User;
export type FirebaseCredential = firebase.auth.UserCredential;
export type FirebaseError = firebase.FirebaseError;
