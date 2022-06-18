import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { Subject } from 'rxjs';
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
      imports: [MatTooltipModule, MatMenuModule, MatDialogModule],
      declarations: [AccountMenuComponent, MatTooltip, MatIcon, MatProgressBar],
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

  // Main feature specifications
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

  it('should display loading bar while waiting user authentication status', fakeAsync(() => {
    // Arrange
    setTimeout(() => (authenticationService.currentUser$ as Subject<FirebaseUser>).next(FirebaseMockHelper.userMock()), 300);

    // Should display loading
    fixture.detectChanges();
    let mainDiv = fixture.nativeElement.querySelector('.nf-account-filler');
    expect(mainDiv).toBeTruthy();

    //Then should display value
    tick(300);
    fixture.detectChanges();
    const firstSpan = fixture.nativeElement.querySelector('span');
    mainDiv = fixture.nativeElement.querySelector('.nf-account-filler');

    expect(mainDiv).toBeFalsy();
    expect(firstSpan.textContent).toContain(fireUserMock.displayName);

    flush();
  }));

  // secondary feature specifications
  // TODO: finish secondary spec tests and verify coverage
  xit('should display tooltip when no verified email and user hover-event', () => {
    expect(component).toBeTruthy();
  });

  xit('should change view to nothing if user becomes null in the process', () => {
    expect(component).toBeTruthy();
  });

  xit('should disconnect when users click on disconnect button', () => {
    expect(component).toBeTruthy();
  });
});
