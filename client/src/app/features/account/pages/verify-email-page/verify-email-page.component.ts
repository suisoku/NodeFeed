import { Component } from '@angular/core';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.scss']
})
export class VerifyEmailPageComponent {
  emailToVerify = '';
  verifiedEmail = false;
  user: FirebaseUser | null = null;

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser$.subscribe({
      next: (user) => {
        if (user) {
          console.log("see", user);
          this.emailToVerify = user.email ?? '';
          this.verifiedEmail = user.emailVerified;
          this.user = user;

          setInterval(() => {
            void this.user?.reload();
          }, 2000);
        }
      }
    });

    this.auth.tokenChanged$((user) => {
      if (user) {
        console.log("is email verified", user.emailVerified);
        this.verifiedEmail = user.emailVerified;
        //I want to show a toaster message and then redirect the user to homepage
      }
    })
  }

  resendEmailVerification(): void {
    if (this.user) {
      void this.auth.sendEmailVerification(this.user);
    }
  }
}
