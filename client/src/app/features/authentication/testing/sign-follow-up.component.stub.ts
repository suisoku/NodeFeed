/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailsSignFormComponent } from '../components/details-sign-form/details-sign-form.component';
import { CredentialsSettingsModel } from '../models/credential-settings.model';
import { SignInDetailsModel } from '../models/sign-in-details.model';

/** Component providing the email signup process */
@Component({
  selector: 'app-sign-follow-up',
  template: '.'
})
export class SignFollowUpStubComponent {
  @ViewChild(DetailsSignFormComponent) dobComponent!: DetailsSignFormComponent;

  @Input() persistedCredentials!: CredentialsSettingsModel;
  @Output() signinAccount = new EventEmitter<CredentialsSettingsModel>();

  signForm!: FormGroup;
  detailsSign: Partial<SignInDetailsModel> = {};
  isDOBvalid = false;
  errorMessage = '';

  emitSignIn(): void {
    return;
  }

  createAccount(): void {
    return;
  }

  handleDetails(signDetails: Partial<SignInDetailsModel>): void {
    return;
  }

  signWithGoogle(): void {
    return;
  }
}
