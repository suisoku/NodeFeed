import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CredentialsModel } from '../../models/credentials.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @Input() persistedCredentials!: CredentialsModel;

  @Output() createAccount = new EventEmitter<CredentialsModel>();

  credentialsForm!: FormGroup;
  hideInputPassword = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.credentialsForm = this.formBuilder.group({
      email: [this.persistedCredentials.email],
      password: [this.persistedCredentials.password]
    });
  }

  emitCreateAccount(): void {
    this.createAccount.emit(this.credentialsForm.value as CredentialsModel);
  }
}
