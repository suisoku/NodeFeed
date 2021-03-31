import { Component } from '@angular/core';
import { CredentialsModel } from '../../models/credentials.model';
@Component({
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent {
  signDisplayMode = true;
  collapsedSignBox = false;
  persistedCredentials: CredentialsModel = { email: '', password: '' };

  switchSignComponent(): void {
    if (this.collapsedSignBox) {
      this.signDisplayMode = !this.signDisplayMode;
      this.collapsedSignBox = false;
    }
  }
}
