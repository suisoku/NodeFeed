import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'any'
})

/**
 * @description
 *
 * Guard signup-google route aiming at  google registration completion
 * signed ? yes verify completion -> true, otherwise a bunch of redirections
 */
export class UnfinishedGoogleSignup implements CanActivate {
  constructor(private router: Router, private _auth: AuthenticationService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const superRedirect: string[] = next.data.superRedirect as string[];

    return this._auth.currentUser$.pipe(
      map((user: FirebaseUser | null) => {
        if (!user) return this.router.createUrlTree(['sign', 'signin']);
        return true;
        // return interval(1000).pipe(map(() => ('1' ? this.router.createUrlTree(['sign', 'signin']) : true)));
      })
    );
  }
}
