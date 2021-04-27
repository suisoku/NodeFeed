import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/features/account/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  displayBurger = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: AuthenticationService) {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
  }
}
