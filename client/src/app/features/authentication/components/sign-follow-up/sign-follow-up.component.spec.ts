import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { BasicSignFormStubComponent } from '../../testing/basic-sign-form.component.stub';
import { DetailsSignFormStubComponent } from '../../testing/details-sign-form.component.stub';

import { SignFollowUpComponent } from './sign-follow-up.component';

describe('SignFollowUpComponent', () => {
  let component: SignFollowUpComponent;
  let fixture: ComponentFixture<SignFollowUpComponent>;

  beforeEach(async () => {
    const routerProvider = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    const formBuilderProvider = jasmine.createSpyObj('FormBuilder', ['group']);
    const authServiceProvider = jasmine.createSpyObj('AuthenticationService', ['registerUser', 'googleSignProcess']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignFollowUpComponent, BasicSignFormStubComponent, DetailsSignFormStubComponent],
      providers: [
        FormGroupDirective,
        FormBuilder,
        { provide: Router, useValue: routerProvider },
        { provide: AuthenticationService, useValue: authServiceProvider }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignFollowUpComponent);
    component = fixture.componentInstance;
    component.persistedCredentials = {
      email: 'abc@abc.com',
      hiddenPassword: true,
      password: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
