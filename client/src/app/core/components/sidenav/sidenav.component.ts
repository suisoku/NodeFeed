import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/features/authentication/services/authentication.service';
import { CreatePostComponent } from 'src/app/features/post/components/create-post/create-post.component';
import { FirebaseUser } from 'src/firebase-app';

/**
 * Side menu in home feed
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {
  private unsubscribe$ = new Subject();
  user?: FirebaseUser | null;
  isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;

  @Input() pageName?: string;

  constructor(private auth: AuthenticationService, public dialog: MatDialog) {
    this.auth.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  public openCreationPostDialog(): void {
    this.dialog.open(CreatePostComponent, {
      width: window.innerWidth > 768 ? '600px' : '100%',
      maxWidth: window.innerWidth > 768 ? '600px' : '98%',
      enterAnimationDuration: '300ms',
      disableClose: true,
      autoFocus: false,
      data: { page: this.pageName, user: this.user }
    });
  }
}
