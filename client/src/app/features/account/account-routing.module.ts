import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, AuthPipe } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';

// loggedIn && !emailVerfied =>  true
const emailNotVerified: AuthPipe = map((user) => !!user && !user.emailVerified);
const emailVerifiedRedirect = () =>
  pipe(
    emailNotVerified,
    map((emailNotVerified) => emailNotVerified || ['/'])
  );

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignPageComponent },
  { path: 'signup', component: SignPageComponent },
  {
    path: 'signup/verify-email',
    component: VerifyEmailPageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: emailVerifiedRedirect }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
