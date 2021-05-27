import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'src/firebase-app';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';
import { CredentialsModel } from '../../models/credentials.model';
import { AuthenticationService } from '../../services/authentication.service';

/** Email sign in component */
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
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private _router: Router,
    private _changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.hideInputPassword = this.persistedCredentials.hiddenPassword;
    this.credentialsForm = this.formBuilder.group({
      email: [this.persistedCredentials.email],
      password: [this.persistedCredentials.password],
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
      .catch((error: FirebaseError) => {
        this.errorMessage = this.auth.errorMessage(error.code);
        this._changeRef.detectChanges();
      });
  }

  signWithGoogle(): void {
    void this.auth.googleSignProcess().then((completeRegistration: boolean) => {
      return this._router.navigate([completeRegistration ? '/' : 'signup-google']);
    });
  }

  forgotPassword(): void {
    void this._router.navigate(['forgot-password']);
  }
}
