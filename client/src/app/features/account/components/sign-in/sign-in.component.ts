import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  credentialsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }
}
