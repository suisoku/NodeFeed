import { CredentialsModel } from './credentials.model';

export interface SignInDetailsModel extends CredentialsModel {
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
}
