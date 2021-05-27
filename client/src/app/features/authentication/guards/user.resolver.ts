import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../services/authentication.service';

/** User resolver by taking first received user */
@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<FirebaseUser> {
  constructor(private _auth: AuthenticationService) {}

  resolve(): Observable<FirebaseUser> {
    return this._auth.currentUser$.pipe(
      take(1),
      map((user) => user as FirebaseUser)
    );
  }
}
