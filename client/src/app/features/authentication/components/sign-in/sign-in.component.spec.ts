import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { BasicSignFormStubComponent } from '../../testing/basic-sign-form.component.stub';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  let router: jasmine.SpyObj<Router>;
  let changeDetectionRef: jasmine.SpyObj<ChangeDetectorRef>;
  let formBuilder: jasmine.SpyObj<FormBuilder>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    // Mock providers
    const routerProvider = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    const changeDetectionRefProvider = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    const authServiceProvider = jasmine.createSpyObj('AuthenticationService', [
      'signIn',
      'googleSignProcess'
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignInComponent, BasicSignFormStubComponent],
      providers: [
        FormBuilder,
        FormGroupDirective,
        { provide: Router, useValue: routerProvider },
        { provide: ChangeDetectorRef, useValue: changeDetectionRefProvider },
        { provide: AuthenticationService, useValue: authServiceProvider }
      ]
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    changeDetectionRef = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
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
