import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseUser } from 'src/firebase-app';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<FirebaseUser | null> {
  constructor(private _auth: AuthenticationService) {}

  resolve(): Observable<FirebaseUser | null> {
    return this._auth.currentUser$;
  }
}
