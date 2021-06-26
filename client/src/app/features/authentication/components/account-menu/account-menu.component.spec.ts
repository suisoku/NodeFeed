import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { of, Subject } from 'rxjs';
import { FirebaseMockHelper } from 'src/app/core/testing/firebase-mock-helper';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationStubService } from '../../testing/authentication.service.stub';
import { AccountMenuComponent } from './account-menu.component';

fdescribe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;
  let fireUserMock: FirebaseUser;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    fireUserMock = FirebaseMockHelper.userMock();
    const changeDetectionRefProvider = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    const authServiceProvider = new AuthenticationStubService();
    await TestBed.configureTestingModule({
      imports: [MatTooltipModule, MatMenuModule],
      declarations: [AccountMenuComponent, MatTooltip, MatIcon],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRefProvider },
        { provide: AuthenticationService, useValue: authServiceProvider }
      ]
    }).compileComponents();

    authenticationService = TestBed.inject(AuthenticationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // main feature specifications
  it('should display user menu bar if the user is logged', () => {
    // Arrange (by default spy service returns a user)
    (authenticationService.currentUser$ as Subject<FirebaseUser>).next(FirebaseMockHelper.userMock());
    // Act
    //subscribe inside service auth constructor returns a value immediatly because the spy returns an synchronous observable
    fixture.detectChanges();

    // Assert
    const firstSpan = fixture.nativeElement.querySelector('span');
    expect(firstSpan.textContent).toContain(fireUserMock.displayName);
  });

  it('should display loading bar while waiting user authentication status', () => {
    expect(component).toBeTruthy();
  });

  it('should display nothing if user is null', () => {
    // Arrange
    //either push new value (is it a case ? maybe you should test it) or really reinstantiate with correct observable
    (authenticationService.currentUser$ as Subject<FirebaseUser | null>).next(null);

    // Act
    //subscribe inside service auth constructor returns a value immediatly because the spy returns an synchronous observable
    fixture.detectChanges();

    // Assert
    const mainDiv = fixture.nativeElement.querySelector('.account-box');
    expect(mainDiv).toBeTruthy();
    expect(mainDiv.querySelector('div')).toBeFalsy();
  });

  //secondary feature specifications
  it('should display tooltip when no verified email and user hover-event', () => {
    expect(component).toBeTruthy();
  });

  it('should disconnect when users click on disconnect button', () => {
    expect(component).toBeTruthy();
  });
});
