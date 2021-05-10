import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, AuthPipe } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseUser } from 'src/firebase-app';
import { GoogleLoggedGuard } from './guards/google-logged.guard';
import { UnfinishedGoogleSignupGuard } from './guards/unfinished-google-signup.guard';
import { UserResolver } from './guards/user.resolver';
import { GoogleSignPageComponent } from './pages/google-sign-page/google-sign-page.component';
import { SignLayoutPageComponent } from './pages/sign-layout-page/sign-layout-page.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';

// Signin Domain : unverified -> 'verify-email' . superlogged -> '/' . unlogged -> pass
const guardSignIn: () => AuthPipe = () =>
  pipe(map((user: FirebaseUser | null) => (!!user && ((user.emailVerified && '/') || 'sign/signup/verify-email')) || true));

// guardVerifyEmail: 'unlogged" -> sign-in , 'unverified' -> pass , 'superlogged' -> homepage
const guardVerifyEmail: () => AuthPipe = () =>
  pipe(map((user: FirebaseUser | null) => (!!user && ((user.emailVerified && '/') || true)) || 'sign/signin'));

//Control access at module level (and not at root level) to facilitate refactoring
const routes: Routes = [
  {
    path: '',
    component: SignLayoutPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signin'
      },
      {
        path: 'signin',
        component: SignPageComponent,
        canActivate: [AngularFireAuthGuard, GoogleLoggedGuard],
        data: { authGuardPipe: guardSignIn }
      },
      {
        path: 'signup',
        component: SignPageComponent,
        canActivate: [AngularFireAuthGuard, GoogleLoggedGuard],
        data: { authGuardPipe: guardSignIn }
      },
      {
        path: 'signup-google',
        component: GoogleSignPageComponent,
        canActivate: [UnfinishedGoogleSignupGuard],
        resolve: { user: UserResolver }
      }
    ]
  },
  {
    path: 'signup/verify-email',
    component: VerifyEmailPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: guardVerifyEmail }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
