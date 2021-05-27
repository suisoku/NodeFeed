import { Component } from '@angular/core';
/**
 * Navigation top bar uses {@link AccountMenuComponent}
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  displayBurger = false;
}
