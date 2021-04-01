import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CredentialsModel } from '../../models/credentials.model';
import { SignInDetailsModel } from '../../models/sign-in-details.model';

@Component({
  selector: 'app-sign-follow-up',
  templateUrl: './sign-follow-up.component.html',
  styleUrls: ['./sign-follow-up.component.scss']
})
export class SignFollowUpComponent implements OnInit {
  @Input() persistedCredentials!: CredentialsModel;

  @Output() signinAccount = new EventEmitter<CredentialsModel>();

  signForm!: FormGroup;
  hideInputPassword = true;
  signInDetails: SignInDetailsModel = {
    name: '',
    birthday: '',
    email: '',
    gender: '',
    password: ''
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      email: [this.persistedCredentials.email],
      password: [this.persistedCredentials.password],
      name: [''],
      birthDay: [''],
      birthMonth: [''],
      birthYear: [''],
      gender: ['']
    });
  }

  emitSignIn(): void {
    this.signinAccount.emit(this.signForm.value as CredentialsModel);
  }
}
