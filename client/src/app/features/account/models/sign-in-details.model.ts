import { CredentialsModel } from './credentials.model';

export interface SignInDetailsModel extends CredentialsModel {
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
}
