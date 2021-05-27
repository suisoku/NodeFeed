import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FirebaseUser } from 'src/firebase-app';
import { SignInDetailsModel } from '../../models/sign-in-details.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './google-sign-page.component.html',
  styleUrls: ['./google-sign-page.component.scss']
})
export class GoogleSignPageComponent implements AfterViewInit {
  userUid!: string;

  signInformation: Partial<SignInDetailsModel> = {};
  validModel = false;

  progressStep = '0%';

  constructor(private _auth: AuthenticationService, private _route: ActivatedRoute, private _router: Router) {
    this._route.data.subscribe({
      next: (data: Data) => {
        const user = data['user'] as FirebaseUser;
        if (!user) {
          //just for added security (cuz the guard + resolver should be enough)
          //toaster.
          //redirect
        }
        this.userUid = user.uid;
        console.log(this.userUid);
      },
      error: (error: unknown) => console.log(error)
    });
  }

  ngAfterViewInit(): void {
    //Apply loading in progress effect
    setTimeout(() => (this.progressStep = '65%'), 300);
  }

  cancelRegistration(): void {
    void this._auth.signOut().then(() => this._router.navigate(['signin']));
  }

  completeRegistration(): void {
    //Apply loading completed progress effect
    this._auth
      .completeGoogleSignup(this.userUid, this.signInformation)
      .then(() => {
        this.progressStep = '100%';
        setTimeout(() => void this._router.navigate(['/']), 800);
      })
      .catch((error) => console.log(error));
  }
}
