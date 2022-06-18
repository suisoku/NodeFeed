import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Guard signup-google route aiming at  google registration completion
 * signed ? yes verify completion -> true, otherwise a bunch of redirections
 */
@Injectable({
  providedIn: 'any'
})
export class UnfinishedGoogleSignupGuard implements CanActivate {
  constructor(private router: Router, private _auth: AuthenticationService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this._auth.currentUser$.pipe(mergeMap(user => (user ? this.userValidUrlTree$(user) : this.userNullUrlTree$())));
  }

  private userNullUrlTree$(): Observable<UrlTree | boolean> {
    return of(this.router.createUrlTree(['sign', 'signin']));
  }

  private userValidUrlTree$(user: FirebaseUser): Observable<UrlTree | boolean> {
    return this._auth
      .getUserDocument$(user)
      .pipe(map(userDoc => (!!userDoc && userDoc['completeRegistration'] === false) || this.router.createUrlTree(['/'])));
  }
}

// you have an observable that streams you user eitther null or no , you can turn this with a pipe into boolean
// ---> user ? -> return Observable<boolean |url tree> that will use google doc internally and user
//          you should have a field and definitly a user doc , if you don't it is odd that want to access signup-google so no --> homepage / error page
//          in the case of a field and false -> true , if yes or other value -> homepage
// if you don't have the field ,
// ---> null >    return an observable<boolean | url tree<
//you have an observable that can take a user and streams you the doc

//what i want is an observable that streams me boolean: yes or an urltree
// current user pipe
//                  if !user -> UrlTree
//                  --------> Observable<boolean | urltree>

// the primarly issue that you have is you want to enforce simmetry (Observable<boolean | urltree> instead of Observable<> | Urltree) although
// you don't respect it . again a lot of your issues only arises in typescipt because you are dealing with types , symetries casts etc
