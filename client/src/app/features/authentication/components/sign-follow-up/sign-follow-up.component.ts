import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormHelper } from 'src/app/core/utilities/form-helper';
import { FirebaseError } from 'src/firebase-app';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';
import { SignInDetailsModel } from '../../models/sign-in-details.model';
import { AuthenticationService } from '../../services/authentication.service';
import { DetailsSignFormComponent } from '../details-sign-form/details-sign-form.component';

/** Component providing the email signup process */
@Component({
  selector: 'app-sign-follow-up',
  templateUrl: './sign-follow-up.component.html',
  styleUrls: ['./sign-follow-up.component.scss']
})
export class SignFollowUpComponent implements OnInit {
  @ViewChild(DetailsSignFormComponent) dobComponent!: DetailsSignFormComponent;

  @Input() persistedCredentials!: CredentialsSettingsModel;
  @Output() signinAccount = new EventEmitter<CredentialsSettingsModel>();

  signForm!: FormGroup;
  detailsSign: Partial<SignInDetailsModel> = {};
  isDOBvalid = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      email: [this.persistedCredentials.email, [Validators.required, Validators.email]],
      password: [
        this.persistedCredentials.password,
        [Validators.required, Validators.pattern('^[A-Za-z\\d@$!%*#?&\\.]{6,}$')]
      ],
      hiddenPassword: [this.persistedCredentials.hiddenPassword],
      name: ['', [Validators.required]] //needs improving Validators.pattern('[a-zA-Z][A-Za-z\\d@$!%*#?&_-]{3,}') only allows one word
    });
  }

  emitSignIn(): void {
    this.signinAccount.emit({
      email: (this.signForm.get('email')?.value as string) ?? '',
      password: (this.signForm.get('password')?.value as string) ?? '',
      hiddenPassword: this.signForm.get('hiddenPassword')?.value as boolean
    });
  }

  createAccount(): void {
    // construct final object by merging properties
    FormHelper.markGroupDirty(this.signForm);
    this.dobComponent.markAsDirty();
    const registration: SignInDetailsModel = {
      ...(this.signForm.value as SignInDetailsModel),
      ...this.detailsSign
    };
    this.auth
      .registerUser(registration)
      .then(() => this.router.navigate(['sign/signup/verify-email']))
      .catch((error: FirebaseError) => (this.errorMessage = this.auth.errorMessage(error.code)));
  }

  handleDetails(signDetails: Partial<SignInDetailsModel>): void {
    this.detailsSign = { ...this.detailsSign, ...signDetails };
  }

  signWithGoogle(): void {
    void this.auth.googleSignProcess().then((completeRegistration: boolean) => {
      return this.router.navigate([completeRegistration ? '/' : 'signup-google']);
    });
  }
}
