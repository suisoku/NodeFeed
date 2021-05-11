import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';
import { CredentialsModel } from '../../models/credentials.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
  @Input() persistedCredentials!: CredentialsSettingsModel;

  @Output() createAccount = new EventEmitter<CredentialsSettingsModel>();

  credentialsForm!: FormGroup;
  hideInputPassword!: boolean;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private _router: Router) {}

  ngOnInit(): void {
    this.hideInputPassword = this.persistedCredentials.hiddenPassword;
    this.credentialsForm = this.formBuilder.group({
      email: [this.persistedCredentials.email, { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
      password: [this.persistedCredentials.password, [Validators.required]],
      hiddenPassword: [this.persistedCredentials.hiddenPassword]
    });
  }

  emitCreateAccount(): void {
    this.createAccount.emit(this.credentialsForm.value as CredentialsSettingsModel);
  }

  signIn(): void {
    const credentials: CredentialsModel = {
      email: this.credentialsForm.get('email')?.value as string,
      password: this.credentialsForm.get('password')?.value as string
    };
    this.auth
      .signIn(credentials)
      .then(() => {
        void this._router.navigateByUrl('/');
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  signWithGoogle(): void {
    this.auth
      .googleSignProcess()
      .then((completeRegistration: boolean) => {
        console.log('DUDE COMPONENT', completeRegistration);
        return this._router.navigate([completeRegistration ? '/' : 'signup-google']);
      })
      .catch((error) => console.log(error));
  }

  forgotPassword(): void {
    void this._router.navigate(['forgot-password']);
  }
}
