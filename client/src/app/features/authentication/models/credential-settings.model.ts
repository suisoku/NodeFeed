import { CredentialsModel } from './credentials.model';

export interface CredentialsSettingsModel extends CredentialsModel {
  hiddenPassword: boolean;
}
