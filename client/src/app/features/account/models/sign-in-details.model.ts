import { CredentialsModel } from './credentials.model';

export interface SignInDetailsModel extends CredentialsModel {
  name: string;
  birthday: string;
  gender: string;
}
