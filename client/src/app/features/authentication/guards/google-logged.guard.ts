import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'any'
})

/**
 * @description
 *
 * Google Logged Guard (independant from superlogged)
 */
export class GoogleLoggedGuard implements CanActivate {
  constructor(private router: Router, private _auth: AuthenticationService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this._auth.currentUser$.pipe(mergeMap((user) => (user ? this._userValidUrlTree(user) : of(true))));
  }

  private _userNullUrlTree(): Observable<UrlTree | boolean> {
    return of(this.router.createUrlTree(['sign', 'signin']));
  }

  private _userValidUrlTree(user: FirebaseUser): Observable<UrlTree | boolean> {
    return this._auth.getUserDocument$(user).pipe(
      map((userDoc) => {
        if (!!userDoc && userDoc['completeRegistration'] === false) return this.router.createUrlTree(['sign/signup-google']);
        return true;
      })
    );
  }
}
