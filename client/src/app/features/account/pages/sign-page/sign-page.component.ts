import { Component } from '@angular/core';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';
@Component({
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent {
  signDisplayMode = true;
  collapsedSignBox = false;
  persistedCredentials: CredentialsSettingsModel = { email: '', password: '', hiddenPassword: true };
  hiddenPassword = true;

  switchSignComponent(): void {
    if (this.collapsedSignBox) {
      this.signDisplayMode = !this.signDisplayMode;
      this.collapsedSignBox = false;
    }
  }

  collapseSignBox(dataCredentials: CredentialsSettingsModel): void {
    this.persistedCredentials = dataCredentials;
    this.collapsedSignBox = true;
  }
}
