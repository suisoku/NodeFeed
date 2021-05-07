import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';
import { SignInDetailsModel } from '../../models/sign-in-details.model';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-sign-follow-up',
  templateUrl: './sign-follow-up.component.html',
  styleUrls: ['./sign-follow-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignFollowUpComponent implements OnInit {
  @Input() persistedCredentials!: CredentialsSettingsModel;
  @Output() signinAccount = new EventEmitter<CredentialsSettingsModel>();

  signForm!: FormGroup;
  detailsSign: Partial<SignInDetailsModel> = {};
  isDOBvalid = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      email: [this.persistedCredentials.email, [Validators.required, Validators.email]],
      password: [this.persistedCredentials.password, [Validators.required]],
      hiddenPassword: [this.persistedCredentials.hiddenPassword],
      name: ['', Validators.required]
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
    const registration: SignInDetailsModel = { ...(this.signForm.value as SignInDetailsModel), ...this.detailsSign };
    console.log('registration', registration);
    this.auth
      .registerUser(registration)
      .then(() => this.router.navigate(['sign/signup/verify-email']))
      .catch(
        (error) => console.log(error) //handle the error states
      );
  }

  handleDetails(signDetails: Partial<SignInDetailsModel>): void {
    this.detailsSign = { ...this.detailsSign, ...signDetails };
  }
}
