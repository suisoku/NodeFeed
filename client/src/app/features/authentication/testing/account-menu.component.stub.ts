import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { FirebaseUser } from 'src/firebase-app';

/**
 * A widget in the navbar displaying current user picture and provide links
 */
@Component({
  selector: 'app-account-menu',
  template: ''
})
export class AccountMenuStubComponent {
  menuIconState = false;
  user: FirebaseUser | null = null;
  isLoadingUser = true;

  get isEmailVerified(): boolean {
    return true;
  }

  @ViewChildren('verifyEmailTooltip') verifyEmailTooltip!: QueryList<MatTooltip>;

  disconnect(): void {
    return;
  }
}
