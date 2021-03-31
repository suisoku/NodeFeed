import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CredentialsModel } from '../../models/credentials.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  @Input() persistedCredentials!: CredentialsModel;
  @Output() createAccount = new EventEmitter<void>();
  hideInputPassword = true;

  constructor() {
    //
  }
}
