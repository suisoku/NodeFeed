import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';
import { CredentialsModel } from '../../models/credentials.model';
import { SignInDetailsModel } from '../../models/sign-in-details.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-follow-up',
  templateUrl: './sign-follow-up.component.html',
  styleUrls: ['./sign-follow-up.component.scss']
})
export class SignFollowUpComponent implements OnInit {
  @Input() persistedCredentials!: CredentialsSettingsModel;

  @Output() signinAccount = new EventEmitter<CredentialsSettingsModel>();

  signForm!: FormGroup;
  hideInputPassword!: boolean;
  signInDetails: SignInDetailsModel = {
    name: '',
    birthday: '',
    email: '',
    gender: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.hideInputPassword = this.persistedCredentials.hiddenPassword;
    this.signForm = this.formBuilder.group({
      email: [this.persistedCredentials.email],
      password: [this.persistedCredentials.password],
      name: [''],
      birthDay: [''],
      birthMonth: [''],
      birthYear: [''],
      gender: ['']
    });
  }

  emitSignIn(): void {
    this.signinAccount.emit({
      email: (this.signForm.get('email')?.value as string) ?? '',
      password: (this.signForm.get('password')?.value as string) ?? '',
      hiddenPassword: this.hideInputPassword
    });
  }

  createAccount(): void {
    const newUser: CredentialsModel = {
      email: this.signForm.get('email')?.value as string,
      password: this.signForm.get('password')?.value as string
    };
    this.auth.createUser(newUser);
  }
}
