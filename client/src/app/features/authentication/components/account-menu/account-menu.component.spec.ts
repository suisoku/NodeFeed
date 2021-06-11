import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltip } from '@angular/material/tooltip';
import { of } from 'rxjs';
import { FirebaseMockHelper } from 'src/app/core/testing/firebase-mock-helper';
import { AuthenticationService } from '../../services/authentication.service';
import { AccountMenuComponent } from './account-menu.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;

  beforeEach(async () => {
    const changeDetectionRefProvider = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    const authServiceProvider = jasmine.createSpyObj('AuthenticationService', ['signOut'], {
      currentUser$: of(FirebaseMockHelper.firebaseUserMock())
    });
    await TestBed.configureTestingModule({
      imports: [MatTooltipModule, MatMenuModule],
      declarations: [AccountMenuComponent, MatTooltip, MatIcon],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRefProvider },
        { provide: AuthenticationService, useValue: authServiceProvider }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
