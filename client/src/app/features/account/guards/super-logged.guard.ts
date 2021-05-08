import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'any'
})

/**
 * @description
 *
 * The SuperLoggedGuard verifies that you are logged and verified (email) hence the name SuperLogged.
 * If you fail the conditions you will be redirected accordingly
 * Takes data if you need a specific redirection when superlogged is true.
 */
export class SuperLoggedGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const superRedirect: string[] = next.data.superRedirect as string[];
    return this.auth.currentUser$.pipe(
      take(1),
      map((user) => {
        if (user) {
          if (user.emailVerified) {
            return superRedirect ? this.router.createUrlTree(superRedirect) : true;
          }
          return this.router.createUrlTree(['sign', 'signup', 'verify-email']);
        }
        return this.router.createUrlTree(['sign', 'signin']);
      })
    );
  }
}
