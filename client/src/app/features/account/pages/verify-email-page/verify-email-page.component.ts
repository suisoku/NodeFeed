import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auditTime, filter, take, tap } from 'rxjs/operators';
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

  constructor(private router: Router, private auth: AuthenticationService) {
    this.auth.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          console.log('seeeeee', user);
          this.emailToVerify = user.email ?? '';
          this.verifiedEmail = user.emailVerified;
          this.user = user;
        }
      }
    });
    this.refreshUserUntilEmailVerified().subscribe(() => {
      console.log('yaaaay');
      void this.router.navigateByUrl('/');
    });
  }

  resendEmailVerification(): void {
    if (this.user) {
      void this.auth.sendEmailVerification(this.user);
    }
  }

  logOut(): void {
    void this.auth.signOut().then(() => this.router.navigateByUrl('/sign'));
  }

  private refreshUserUntilEmailVerified(interval = 1000): Observable<FirebaseUser | null> {
    return this.auth.currentUser$.pipe(
      auditTime(interval),
      tap((user) => {
        void user?.reload();
        void this.auth.updateCurrentUser(user);
      }),
      filter((user) => !!user?.emailVerified),
      take(1)
    );
  }
}
