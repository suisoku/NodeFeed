import { FirebaseUser } from 'src/firebase-app';

export interface PostDialogData {
  page?: string;
  user: FirebaseUser;
}
