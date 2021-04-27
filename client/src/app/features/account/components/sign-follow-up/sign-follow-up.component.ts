import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      email: [this.persistedCredentials.email, [Validators.required, Validators.email]],
      password: [this.persistedCredentials.password, [Validators.required]],
      hiddenPassword: [this.persistedCredentials.hiddenPassword],
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
      hiddenPassword: this.signForm.get('hiddenPassword')?.value as boolean
    });
  }

  createAccount(): void {
    this.auth
      .registerUser(this.signForm.value as SignInDetailsModel)
      .then(() => this.router.navigate(['verify-email'], { relativeTo: this.activeRoute }))
      .catch(
        (error) => console.log(error) //handle the error states
      );
  }
}
