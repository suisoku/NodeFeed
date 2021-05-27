import { AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChildren } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements AfterViewInit {
  menuIconState = false;
  user: FirebaseUser | null = null;
  isLoadingUser = true;

  get isEmailVerified(): boolean {
    return this.user?.emailVerified ?? true;
  }

  @ViewChildren('verifyEmailTooltip') verifyEmailTooltip!: QueryList<MatTooltip>;

  constructor(private auth: AuthenticationService, private cdr: ChangeDetectorRef) {
    this.auth.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLoadingUser = false;
    });
  }

  ngAfterViewInit(): void {
    this.verifyEmailTooltip.changes.subscribe({
      next: (tooltips: QueryList<MatTooltip>) => {
        tooltips?.first?.show();
        setTimeout(() => tooltips?.first?.hide(), 3000);
        this.cdr.detectChanges();
      }
    });
  }

  disconnect(): void {
    void this.auth.signOut();
  }
}
