import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
  menuIconState = false;
  user: FirebaseUser | null = null;
  isLoadingUser = true;
  //what I need to know is there an user logged in or no ? I need to know I am loading this info or no

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLoadingUser = false;
    });
  }

  disconnect(): void {
    void this.auth.signOut();
  }
}
