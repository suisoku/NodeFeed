import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';
import { CredentialsModel } from '../../models/credentials.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Input() persistedCredentials!: CredentialsSettingsModel;

  @Output() createAccount = new EventEmitter<CredentialsSettingsModel>();

  credentialsForm!: FormGroup;
  hideInputPassword!: boolean;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.hideInputPassword = this.persistedCredentials.hiddenPassword;
    this.credentialsForm = this.formBuilder.group({
      email: [this.persistedCredentials.email],
      password: [this.persistedCredentials.password]
    });
  }

  emitCreateAccount(): void {
    this.createAccount.emit({ ...(this.credentialsForm.value as CredentialsModel), hiddenPassword: this.hideInputPassword });
  }

  signIn(): void {
    console.log("ici");
    const credentials: CredentialsModel = {
      email: this.credentialsForm.get('email')?.value as string,
      password: this.credentialsForm.get('password')?.value as string
    };
    this.auth.signIn(credentials);
  }
}
