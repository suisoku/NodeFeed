import { AfterViewChecked, AfterViewInit, Component, ViewChild } from '@angular/core';
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

  @ViewChild('verifyEmailTooltip') set verifyEmailTooltip(tooltip: MatTooltip) {
    console.log('setted', tooltip);
  }

  constructor(private auth: AuthenticationService) {
    this.auth.currentUser$.subscribe((user) => {
      this.user = user;
      this.isLoadingUser = false;
    });
  }

  ngAfterViewInit(): void {
    console.log('checked', this.verifyEmailTooltip);
    //this.verifyEmailTooltip.show();
    //setInterval(() => this.verifyEmailTooltip.hide(), 2500);

    //angular reevalue tous les proprietes si la vue change
    //intant 0 : verifyemail est a 0 car ngif et httpobservable
    //instant 1 : http et ngif resolved -> template rendered -> viewchanged event fired -> viewchild a une valeur
    //le but c'est d'attendre par un moyen ou un autre que view child est pret avant de pouvoir l'utiliser
    //solution possibles will inevitably involve some kinda hooker to watch changes
    //1. dans le setter verifier quand on recoit le bon objet
    //2. apres chaque changement de vue verifier si tooltip est attribue (ngAfterViewChecked)
    //3. viewchildren.changes/subscribe() technique
    //setter technique bad trigger error before --- + link
    //cleanest sol is ngchecked go for it
  }

  disconnect(): void {
    void this.auth.signOut();
  }
}
