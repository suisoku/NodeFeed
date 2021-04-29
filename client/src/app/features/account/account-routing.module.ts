import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, AuthPipe, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';

// loggedIn && !emailVerfied =>  true
const emailNotVerified: AuthPipe = map((user) => !!user && !user.emailVerified);
const emailVerifiedRedirect = () =>
  pipe(
    emailNotVerified,
    map((emailNotVerified) => emailNotVerified || ['/'])
  );

const redirectLoggedIn = () => redirectLoggedInTo(['/']);
//I need a pipe if you are logged and email not verified


//Control access at module level (and not at root level) to facilitate refactoring
const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedIn } },
  { path: 'signup', component: SignPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedIn } },
  {
    path: 'signup/verify-email',
    component: VerifyEmailPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: emailVerifiedRedirect }
  },
  { path: 'profile', component: ProfilePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
