import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FirebaseMockHelper } from 'src/app/core/testing/firebase-mock-helper';
import { AuthenticationService } from '../../services/authentication.service';
import { VerifyEmailPageComponent } from './verify-email-page.component';

describe('VerifyEmailPageComponent', () => {
  let component: VerifyEmailPageComponent;
  let fixture: ComponentFixture<VerifyEmailPageComponent>;

  beforeEach(async () => {
    const routerProvider = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const snackbarProvider = jasmine.createSpyObj('MatSnackBar', ['open']);
    const authServiceProvider = jasmine.createSpyObj(
      'AuthenticationService',
      ['signOut', 'sendEmailVerification', 'updateCurrentUser'],
      {
        currentUser$: of(FirebaseMockHelper.userMock())
      }
    );

    await TestBed.configureTestingModule({
      declarations: [VerifyEmailPageComponent],
      providers: [
        { provide: Router, useValue: routerProvider },
        { provide: MatSnackBar, useValue: snackbarProvider },
        { provide: AuthenticationService, useValue: authServiceProvider }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
