import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.scss']
})
export class VerifyEmailPageComponent {
  emailToVerify = '';
  verifiedEmail = false;

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          console.log(user);
          this.emailToVerify = user.email ?? '';
          this.verifiedEmail = user.emailVerified;
        }
      }
    });
  }

  signOut(): void {
    void this.auth.signOut();
  }
}
