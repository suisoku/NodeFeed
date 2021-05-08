import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInDetailsModel } from '../../models/sign-in-details.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './google-sign-page.component.html',
  styleUrls: ['./google-sign-page.component.scss']
})
export class GoogleSignPageComponent implements AfterViewInit {
  signInformation: Partial<SignInDetailsModel> = {};
  validModel = false;
  progressStep = '0%';

  constructor(private _auth: AuthenticationService, private _router: Router) {}

  ngAfterViewInit(): void {
    //Apply loading in progress effect
    setTimeout(() => (this.progressStep = '50%'), 300);
  }

  cancelRegistration(): void {
    //log you out and redirect you to signin or up
  }

  completeRegistration(): void {
    //Apply loading completed progress effect
    this._auth
      .completeGoogleSignup('', this.signInformation)
      .then(() => {
        this.progressStep = '100%';
        setTimeout(() => void this._router.navigate(['/']), 300);
      })
      .catch((error) => console.log(error));
  }
}
