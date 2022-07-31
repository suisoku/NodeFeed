import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { CreateFeedModalComponent } from 'src/app/features/feed/components/create-feed-modal/create-feed-modal.component';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../../services/authentication.service';

/**
 * A widget in the navbar displaying current user picture and provide links
 */
@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountMenuComponent implements AfterViewInit {
  menuIconState = false;
  user: FirebaseUser | null = null;
  isLoadingUser = true;

  get isEmailVerified(): boolean {
    return this.user?.emailVerified ?? true;
  }

  @ViewChildren('verifyEmailTooltip') verifyEmailTooltip!: QueryList<MatTooltip>;

  constructor(
    private auth: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.auth.currentUser$.subscribe(user => {
      this.user = user;
      this.isLoadingUser = false;
    });
  }

  ngAfterViewInit(): void {
    // On tooltip init: programs 3sec showup behaviour
    this.verifyEmailTooltip.changes.subscribe({
      next: (tooltips: QueryList<MatTooltip>) => {
        tooltips?.first?.show();
        setTimeout(() => tooltips?.first?.hide(), 3000);
        this.cdr.detectChanges();
      }
    });
  }

  openCreateNodefeedModal(): void {
    this.dialog.open(CreateFeedModalComponent, {
      panelClass: 'createNfModal'
    });
  }

  disconnect(): void {
    void this.auth.signOut();
  }
}
