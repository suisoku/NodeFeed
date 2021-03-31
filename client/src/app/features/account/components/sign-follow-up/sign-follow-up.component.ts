import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CredentialsModel } from '../../models/credentials.model';

@Component({
  selector: 'app-sign-follow-up',
  templateUrl: './sign-follow-up.component.html',
  styleUrls: ['./sign-follow-up.component.scss']
})
export class SignFollowUpComponent {
  @Input() persistedCredentials!: CredentialsModel;
  @Output() signinAccount = new EventEmitter<void>();
  hideInputPassword = true;

  constructor() {
    //
  }
}
